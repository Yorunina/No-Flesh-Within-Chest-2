// priority: 1900
function SlotStrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.strategyMap = {}
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}

SlotStrategyModel.prototype = {
    /**
     * @param {Object<string, function(...any): void>} strategyMap
     */
    setStrategyMap: function (strategyMap) {
        this.strategyMap = strategyMap
        return this
    },
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     */
    addStrategy: function (id, func) {
        this.strategyMap[id] = func

        return this
    },
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     */
    addOnlyStrategy: function (id, func) {
        this.onlyStrategyMap[id] = func
        return this
    },
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
     * @param {Internal.ChestCavityInstance} chestCavity
     * @param {any[]} args 
     * @param {any} customData
     */
    run: function (chestCavity, args, customData) {
        const ccInv = chestCavity.inventory
        const invTypeData = chestCavity.getInventoryTypeData()
        args.unshift(customData)
        this.init.apply(null, args)
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let curItem = ccInv.getStackInSlot(i)
            if (!curItem || curItem.isEmpty()) continue
            let slotType = invTypeData.getSlotType(i)
            if (this.strategyMap[slotType]) {
                this.strategyMap[slotType].apply(null, args.concat(curItem, i))
            }
        }
        this.defer.apply(null, args)
        return
    },
}
