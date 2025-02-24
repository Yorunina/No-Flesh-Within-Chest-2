// priority: 1000

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
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        let ccInv = ccInstance.inventory

        const onlyMap = new Map()
        args.unshift(customData)
        let slotMap = ccInstance.getListenerMap(this.eventId)
        if (!slotMap) return
        slotMap.forEach((slotIndex, slotType) => {
            let curItem = ccInv.getStackInSlot(slotIndex)
            if (!curItem || curItem.isEmpty()) return
            let itemId = String(curItem.id)
            let strategyModel = OrganStrategyMap[itemId]
            let onlyOrganStrategy = strategyModel.onlyStrategyMap[this.eventId]

            if (onlyOrganStrategy && !onlyMap.has(itemId)) {
                onlyMap.set(itemId, true)
                onlyOrganStrategy.apply(null, args.concat(curItem, slotIndex, slotType))
            }
            let organStrategy = strategyModel.strategyMap[this.eventId]
            if (organStrategy) {
                organStrategy.apply(null, args.concat(curItem, slotIndex, slotType))
            }
        })
    }
}