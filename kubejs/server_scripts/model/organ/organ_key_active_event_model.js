// priority: 2000
function OrganKeyActiveEventModel(eventId) {
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}
OrganKeyActiveEventModel.prototype = {
    /**
     * @param {function(...any): void} data
     */
    addInit: function (initFunc) {
        this.inits.push(initFunc)
        return this
    },
    /**
     * @param {function(...any): void} data
     */
    addDefer: function (deferFunc) {
        this.defers.push(deferFunc)
        return this
    },
    /**
     * 逐策略隔离普通异常，事件中断继续向外传播。
     * @param {Internal.Entity} entity
     * @param {string} itemId
     * @param {OrganEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, itemId, customData, args) {
        let optional = $ChestCavityEntity.of(entity)
        if (!optional.isPresent()) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        let ccInv = ccInstance.inventory
        const onlyMap = new Map()
        let slotMap = ccInstance.getListenerMap(this.eventId)
        if (slotMap && slotMap.size() > 0) {
            let strategyFuncList = []
            slotMap.forEach((slotIndex, slotType) => {
                let curItem = ccInv.getStackInSlot(slotIndex)
                if (!curItem || curItem.isEmpty() || curItem.id != itemId) return
                let strategyModel = OrganStrategyMap[itemId]
                if (!strategyModel) return
                let organEventStrategy = strategyModel.strategyMap[this.eventId]
                if (!organEventStrategy) return
                if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                    onlyMap.set(itemId, true)
                    organEventStrategy['only'].forEach(e => {
                        strategyFuncList.push(new PriorityArgsModel(e, args.concat(curItem, slotIndex, slotType)))
                    })
                }
                if (organEventStrategy['default'] && organEventStrategy['default'].length > 0) {
                    organEventStrategy['default'].forEach(e => {
                        strategyFuncList.push(new PriorityArgsModel(e, args.concat(curItem, slotIndex, slotType)))
                    })
                }
            })

            if (strategyFuncList.length > 0) {
                strategyFuncList.sort((a, b) => {
                    return b.getPriority() - a.getPriority()
                })
                strategyFuncList.forEach((model) => {
                    let func = model.getFunc()
                    let strategyArgs = model.getArgs()
                    try {
                        func.apply(null, strategyArgs)
                    } catch (err) {
                        HandleStrategyError(err, this.eventId, func.name)
                    }
                })
            }
            ExcretionSlotEvent(customData, ccInstance)
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
    }
}
