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
     * @param {Internal.LivingEntity} entity
     * @param {OrganEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, customData, args) {
        const ccInstance = entity.chestCavityInstance
        const ccInv = ccInstance.inventory
        const oldccInv = ccInstance.oldInventory
        if (!oldccInv || !ccInv) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        const invTypeData = ccInstance.getInventoryTypeData()
        const oldInvTypeData = ccInstance.getOldInventoryTypeData()
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
                if (newItem.equals(oldItem, true) && !IsContainerSlot(oldInvTypeData.getSlotType(i))) continue
            }

            let itemId = newItem.id
            let strategyModel = OrganStrategyMap[itemId]
            if (entity.isPlayer() && newItem.hasTag('kubejs:key_active')) {
                let data = new $CompoundTag()
                data.putString('type', 'add')
                data.putInt('slot', i)
                data.putString('itemId', itemId)
                EnqueueSendData(entity, 'update_organ_skill_wheel_item', data)
            }
            if (strategyModel) {
                Object.keys(strategyModel.strategyMap).forEach(eventId => {
                    ccInstance.addListener(eventId, i)
                })
                let organEventStrategy = strategyModel.strategyMap[this.eventId]
                if (organEventStrategy) {
                    if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                        onlyMap.set(itemId, true)
                        organEventStrategy['only'].forEach(e => {
                            strategyFuncList.push(new PriorityArgsModel(e, args.concat(newItem, i, slotType)))
                        })
                    }
                    if (organEventStrategy['default']) {
                        organEventStrategy['default'].forEach(e => {
                            strategyFuncList.push(new PriorityArgsModel(e, args.concat(newItem, i, slotType)))
                        })
                    }
                }
            }
        }

        if (strategyFuncList.length > 0) {
            strategyFuncList.sort((a, b) => {
                return b.getPriority() - a.getPriority()
            })
            strategyFuncList.forEach((model) => {
                model.getFunc().apply(null, model.getArgs())
            })
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}
