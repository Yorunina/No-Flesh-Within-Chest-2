// priority: 1900
function SlotStrategyModel() {
    /**@type {Object<string, Object<string, function(...any)>: void>} */
    this.strategyMap = {}
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
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
     * @param {Internal.ChestCavityInstance} chestCavity
     * @param {any[]} args 
     * @param {OrganEventCustomData} customData
     */
    run: function (chestCavity, args, customData) {
        const ccInv = chestCavity.inventory
        customData.localDefer = []
        const invTypeData = chestCavity.getInventoryTypeData()
        args.unshift(customData)
        const onlyMap = new Map()
        this.inits.forEach(init => {
            init.apply(null, args)
        })
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
        customData.localDefer.forEach((func) => {
            func.apply(null, args) 
        })
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}