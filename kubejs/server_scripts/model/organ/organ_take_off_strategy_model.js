// priority: 1900
function OrganTakeOffStrategyModel() {
    this.eventId = 'organ_take_off'
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

OrganTakeOffStrategyModel.prototype = {
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
        const oldInvTypeData = ccInstance.getOldInventoryTypeData()
        const onlyMap = new Map()
        const onlyMPMMap = new Map()
        let needLoadMpm = ccInstance.owner.isPlayer() && IsLoadedMPM
        let oldContainerSize = oldccInv.getContainerSize()
        let newContainerSize = ccInv.getContainerSize()

        let strategyFuncList = []
        for (let i = 0; i < oldContainerSize; i++) {
            let slotType = oldInvTypeData.getSlotType(i)
            if (IsContainerSlot(slotType)) continue
            let oldItem = oldccInv.getStackInSlot(i)
            if (!oldItem || oldItem.isEmpty()) continue
            if (i <= newContainerSize) {
                let newItem = ccInv.getStackInSlot(i)
                if (oldItem.equals(newItem, true)) continue
            }

            let itemId = oldItem.id
            let strategyModel = OrganStrategyMap[itemId]
            if (strategyModel) {
                let organEventStrategy = strategyModel.strategyMap[this.eventId]
                if (organEventStrategy) {
                    if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                        onlyMap.set(itemId, true)
                        organEventStrategy['only'].forEach(e => {
                            strategyFuncList.push({
                                'strategyModel': e,
                                'arg': args.concat(oldItem, i, slotType)
                            })
                        })
                    }
                    if (organEventStrategy['default']) {
                        organEventStrategy['default'].forEach(e => {
                            strategyFuncList.push({
                                'strategyModel': e,
                                'arg': args.concat(oldItem, i, slotType)
                            })
                        })
                    }
                }
            }
            // MPM策略
            if (needLoadMpm) {
                let mpmEventStrategy = strategyModel.strategyMap['mpm_render_take_off']
                if (mpmEventStrategy) {
                    if (!customData.modelData) {
                        customData.modelData = $ModelData.get(ccInstance.owner)
                    }
                    if (mpmEventStrategy['only'] && !onlyMPMMap.has(itemId)) {
                        onlyMPMMap.set(itemId, true)
                        mpmEventStrategy['only'].forEach(e => {
                            strategyFuncList.push({
                                'strategyModel': e,
                                'arg': args.concat(oldItem, i, slotType)
                            })
                        })
                    }
                    if (mpmEventStrategy['default']) {
                        mpmEventStrategy['default'].forEach(e => {
                            strategyFuncList.push({
                                'strategyModel': e,
                                'arg': args.concat(oldItem, i, slotType)
                            })
                        })
                    }
                }
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
