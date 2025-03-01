// priority: 2000
function OrganKeyActiveEventModel(eventId) {
    this.eventId = eventId
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}
OrganKeyActiveEventModel.prototype = {
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
     * @param {Internal.ItemStack} item
     * @param {OrganEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, item, customData, args) {
        let optional = $ChestCavityEntity.of(entity)
        customData.localDefer = []

        if (!optional.isPresent()) return
        args.unshift(customData)
        this.init.apply(null, args)
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        let ccInv = ccInstance.inventory
        let itemId = String(item.id)
        const onlyMap = new Map()
        let slotMap = ccInstance.getListenerMap(this.eventId)
        console.log(itemId)
        if (slotMap) {
            slotMap.forEach((slotIndex, slotType) => {
                let curItem = ccInv.getStackInSlot(slotIndex)
                if (!curItem || curItem.isEmpty() || curItem.id != itemId) return
                console.log(slotIndex)
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
        ExcretionSlot(customData, ccInstance)

        customData.localDefer.forEach((func) => {
            func.apply(null, args) 
        })
        this.defer.apply(null, args)
    }
}