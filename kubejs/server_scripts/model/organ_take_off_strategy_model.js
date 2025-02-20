// priority: 900
function OrganTakeOffStrategyModel() {
    this.eventId = 'organ_take_off'
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}

OrganTakeOffStrategyModel.prototype = {
    /**
     * @param {Object<string, function(...any): void>} strategyMap
     */
    setStrategyMap: function (strategyMap) {
        this.strategyMap = strategyMap
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
     * @param {Internal.ChestCavityInstance} ccInstance
     * @param {any[]} args 
     * @param {any} customData
     */
    run: function (ccInstance, args, customData) {
        const ccInv = ccInstance.inventory
        const oldccInv = ccInstance.oldInventory
        if (!oldccInv) return
        args.unshift(customData)
        this.init.apply(null, args)
        let onlySet = new Set()
        let oldContainerSize = oldccInv.getContainerSize()
        for (let i = 0; i < oldContainerSize; i++) {
            let oldItem = oldccInv.getStackInSlot(i)
            if (!oldItem || oldItem.isEmpty()) continue
            let newItem = ccInv.getStackInSlot(i)
            if (oldItem.equals(newItem, true)) continue
            let itemId = oldItem.id
            let strategyModel = OrganStrategyMap[itemId]
            if (!strategyModel) continue
            let onlyOrganStrategy = strategyModel.onlyStrategyMap[this.eventId]
    
            if (onlyOrganStrategy && !onlySet.has(itemId)) {
                onlySet.add(itemId)
                onlyOrganStrategy.apply(null, args.concat(oldItem, i))
            }
            let organStrategy = strategyModel.strategyMap[this.eventId]
            if (organStrategy) {
                organStrategy.apply(null, args.concat(oldItem, i))
            }
        }

        this.defer.apply(null, args)
        return
    },
}
