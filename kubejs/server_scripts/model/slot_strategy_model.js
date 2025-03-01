// priority: 1900
function SlotStrategyModel() {
    /**@type {Object<string, Object<string, function(...any)>: void>} */
    this.strategyMap = {}
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}

SlotStrategyModel.prototype = {
    /**
     * @param {Object<string, Object<string, function(...any)>: void>} strategyMap
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
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {}
        }
        this.strategyMap[id]['default'] = func
        return this
    },
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     */
    addOnlyStrategy: function (id, func) {
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {}
        }
        this.strategyMap[id]['only'] = func
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
     * @param {OrganEventCustomData} customData
     */
    run: function (chestCavity, args, customData) {
        const ccInv = chestCavity.inventory
        const invTypeData = chestCavity.getInventoryTypeData()
        args.unshift(customData)
        const onlyMap = new Map()
        this.init.apply(null, args)
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let curItem = ccInv.getStackInSlot(i)
            if (!curItem || curItem.isEmpty()) continue
            let slotType = invTypeData.getSlotType(i)
            let strategyModel = this.strategyMap[slotType]
            if (!strategyModel) continue
            if (strategyModel['only'] && !onlyMap.has(itemId)) {
                onlyMap.set(itemId, true)
                strategyModel['only'].apply(null, args.concat(curItem, i))
            }
            if (strategyModel['default']) {
                strategyModel['default'].apply(null, args.concat(curItem, i))
            }
        }
        this.defer.apply(null, args)
        return
    },
}