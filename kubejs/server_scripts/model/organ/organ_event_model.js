// priority: 2000
function OrganEventModel(eventId) {
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}
OrganEventModel.prototype = {
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
     * 逐策略隔离普通异常；胸腔属性重算失败时终止，避免提交不完整贡献。
     * @param {Internal.Entity} entity
     * @param {OrganEventCustomData} customData
     * @param {any[]} args
     */
    run: function (entity, customData, args) {
        let event = args[0]
        let optional = $ChestCavityEntity.of(entity)
        if (!optional.isPresent()) return
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        if (!ccInstance) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        let ccInv = ccInstance.inventory
        const onlyMap = new Map()
        // 按事件登记的槽位分发，避免在高频事件中扫描整个胸腔。
        let slotMap = ccInstance.getListenerMap(this.eventId)
        if (slotMap && slotMap.size() > 0) {
            let strategyFuncList = []
            const onlyEffectMap = new Map()
            slotMap.forEach((slotIndex, slotType) => {
                let curItem = ccInv.getStackInSlot(slotIndex)
                if (!curItem || curItem.isEmpty()) return
                let itemId = String(curItem.id)
                let strategyModel = OrganStrategyMap[itemId]
                if (strategyModel) {
                    let organEventStrategy = strategyModel.strategyMap[this.eventId]
                    if (organEventStrategy) {
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
                    }
                }

                let modularItem = curItem.getItem()
                if (TetraJSUtils.isModularItem(modularItem)) {
                    const byEvent = GetTetraOrganEffectsByEvent(ccInstance, slotIndex, modularItem, curItem)
                    CollectTetraOrganEffectStrategies(byEvent[this.eventId], this.eventId, args,
                        { modularItem: modularItem, stack: curItem, slotIndex: slotIndex, slotType: slotType }, strategyFuncList, onlyEffectMap)
                }
            })
            QueueOnlyTetraOrganEffectStrategies(onlyEffectMap, strategyFuncList)
            if (strategyFuncList.length > 0) {
                strategyFuncList.sort((a, b) => {
                    return b.getPriority() - a.getPriority()
                })
                for (let model of strategyFuncList) {
                    if (event && event.isCanceled && event.isCanceled()) break
                    let func = model.getFunc()
                    let strategyArgs = model.getArgs()
                    if (this.eventId == 'chest_cavity_update') {
                        func.apply(null, strategyArgs)
                        continue
                    }
                    try {
                        func.apply(null, strategyArgs)
                    } catch (err) {
                        HandleStrategyError(err, this.eventId, func.name)
                    }
                }
            }
            ExcretionSlotEvent(customData, ccInstance)
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
    }
}
