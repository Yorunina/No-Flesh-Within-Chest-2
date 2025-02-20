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

        const onlySet = new Set()
        args.unshift(customData)
        let slotList = ccInstance.getListenerList(this.eventId)
        if (!slotList) return
        slotList.forEach(slotIndex => {
            let curItem = ccInv.getStackInSlot(slotIndex)
            if (!curItem || curItem.isEmpty()) return
            let itemId = curItem.id
            let strategyModel = OrganStrategyMap[itemId]
            let onlyOrganStrategy = strategyModel.onlyStrategyMap[this.eventId]

            if (onlyOrganStrategy && !onlySet.has(itemId)) {
                onlySet.add(itemId)
                onlyOrganStrategy.apply(null, args.concat(curItem, slotIndex))
            }
            let organStrategy = strategyModel.strategyMap[this.eventId]
            if (organStrategy) {
                organStrategy.apply(null, args.concat(curItem, slotIndex))
            }
        })
    }
}