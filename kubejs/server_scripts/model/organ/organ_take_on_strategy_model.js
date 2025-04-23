// priority: 1900
function OrganTakeOnStrategyModel() {
    this.eventId = 'organ_take_on'
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

OrganTakeOnStrategyModel.prototype = {
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
     * @param {Internal.ChestCavityInstance} ccInstance
     * @param {any[]} args 
     * @param {OrganEventCustomData} customData
     */
    run: function (ccInstance, args, customData) {
        const ccInv = ccInstance.inventory
        const oldccInv = ccInstance.oldInventory
        if (!oldccInv || !ccInv) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        const invTypeData = ccInstance.getInventoryTypeData()
        const onlyMap = new Map()
        let oldContainerSize = oldccInv.getContainerSize()
        let newContainerSize = ccInv.getContainerSize()

        let strategyFuncList = []
        for (let i = 0; i < newContainerSize; i++) {
            let slotType = invTypeData.getSlotType(i)
            if (IsContainerSlot(slotType)) continue
            let newItem = ccInv.getStackInSlot(i)
            if (!newItem || newItem.isEmpty()) continue
            if (i <= oldContainerSize) {
                let oldItem = oldccInv.getStackInSlot(i)
                if (newItem.equals(oldItem, true)) continue
            }

            let itemId = newItem.id
            let strategyModel = OrganStrategyMap[itemId]
            if (!strategyModel) continue
            let organEventStrategy = strategyModel.strategyMap[this.eventId]
            if (!organEventStrategy) continue
            if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                onlyMap.set(itemId, true)
                organEventStrategy['only'].forEach(e => {
                    strategyFuncList.push({
                        'strategyModel': e,
                        'arg': args.concat(newItem, i, slotType)
                    })
                })
            }
            if (organEventStrategy['default']) {
                organEventStrategy['default'].forEach(e => {
                    strategyFuncList.push({
                        'strategyModel': e,
                        'arg': args.concat(newItem, i, slotType)
                    })
                })
            }
        }

        if (strategyFuncList.length > 0) {
            strategyFuncList.sort((a, b) => {
                return b['strategyModel']['priority'] - a['strategyModel']['priority']
            })
            strategyFuncList.forEach((model) => {
                model['strategyModel']['func'].apply(null, model['arg'])
            })
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}
