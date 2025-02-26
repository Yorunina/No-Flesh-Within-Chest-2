// priority: 2000

function OrganEventModel(eventId) {
    this.eventId = eventId
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}
OrganEventModel.prototype = {
    /**
     * @param {function(...any): void} data
     */
    setInit: function (initFunc) {
        this.init = initFunc
        return this
    },
    /**
     * @param {function(...any): void} data
     */
    setDefer: function (deferFunc) {
        this.defer = deferFunc
        return this
    },
    /**
     * @param {Internal.Entity} entity
     * @param {any} customData
     * @param {any[]} args 
     */
    run: function (entity, customData, args) {
        let optional = $ChestCavityEntity.of(entity)

        if (!optional.isPresent()) return
        args.unshift(customData)
        this.init.apply(null, args)
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        let ccInv = ccInstance.inventory
        const onlyMap = new Map()
        let slotMap = ccInstance.getListenerMap(this.eventId)
        if (slotMap) {
            slotMap.forEach((slotIndex, slotType) => {
                let curItem = ccInv.getStackInSlot(slotIndex)
                if (!curItem || curItem.isEmpty()) return
                let itemId = String(curItem.id)
                let strategyModel = OrganStrategyMap[itemId]
                if (!strategyModel) return
                let organEventStrategy = strategyModel.strategyMap[this.eventId]
                if (!organEventStrategy) return
                if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                    onlyMap.set(itemId, true)
                    organEventStrategy['only'].apply(null, args.concat(curItem, slotIndex, slotType))
                }
                if (organEventStrategy['default']) {
                    organEventStrategy['default'].apply(null, args.concat(curItem, slotIndex, slotType))
                }
            })
        }

        this.defer.apply(null, args)
    }
}