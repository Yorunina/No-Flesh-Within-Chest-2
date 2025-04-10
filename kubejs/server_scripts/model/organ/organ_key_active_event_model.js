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
     * @param {Internal.Entity} entity
     * @param {Internal.ItemStack} item
     * @param {OrganEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, item, customData, args) {
        let optional = $ChestCavityEntity.of(entity)

        if (!optional.isPresent()) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        let ccInv = ccInstance.inventory
        let itemId = String(item.id)
        const onlyMap = new Map()
        let slotMap = ccInstance.getListenerMap(this.eventId)
        if (slotMap) {
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
                        strategyFuncList.push({
                            'strategyModel': e,
                            'arg': args.concat(curItem, slotIndex, slotType)
                        })
                    })
                }
                if (organEventStrategy['default'] && organEventStrategy['default'].length > 0) {
                    organEventStrategy['default'].forEach(e => {
                        strategyFuncList.push({
                            'strategyModel': e,
                            'arg': args.concat(curItem, slotIndex, slotType)
                        })
                    })
                }
            })
            
            if (strategyFuncList.length > 0) {
                strategyFuncList.sort((a, b) => {
                    return b['strategyModel']['priority'] - a['strategyModel']['priority']
                })
                strategyFuncList.forEach((model) => {
                    model['strategyModel']['func'].apply(null, model['arg'])
                })
            }
        }
        ExcretionSlot(customData, ccInstance)
        
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
    }
}