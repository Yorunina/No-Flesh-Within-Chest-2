// priority: 1900
function OrganChestCavityUpdateStrategyModel() {
    /**@type {Object<string, Object<string, function(...any)>: void>} */
    this.eventId = 'chest_cavity_update'
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

OrganChestCavityUpdateStrategyModel.prototype = {
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
     * @param {OrganChestCavityUpdateStrategyCustomData} customData
     */
    run: function (ccInstance, args, customData) {
        const ccInv = ccInstance.inventory

        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })

        let needLoadMpm = ccInstance.owner.isPlayer() && IsLoadedMPM
        const onlyMap = new Map()
        ccInstance.clearListenerMap()
        const invTypeData = ccInstance.getInventoryTypeData()

        let strategyFuncList = []
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let slotType = invTypeData.getSlotType(i)
            if (IsContainerSlot(slotType)) continue
            let curItem = ccInv.getStackInSlot(i)
            let itemId = String(curItem.id)
            if (OrganStrategyMap[itemId]) {
                let strategyModel = OrganStrategyMap[itemId]
                Object.keys(strategyModel.strategyMap).forEach(eventId => {
                    ccInstance.addListener(eventId, i)
                })
            }

            // 执行常规更新器官效果策略
            if (!curItem || curItem.isEmpty()) continue

            let strategyModel = OrganStrategyMap[itemId]
            if (!strategyModel) continue

            let organEventStrategy = strategyModel.strategyMap[this.eventId]
            // 器官更新策略
            if (organEventStrategy) {
                if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                    onlyMap.set(itemId, true)
                    organEventStrategy['only'].forEach(e => {
                        strategyFuncList.push({
                            'strategyModel': e,
                            'arg': args.concat(curItem, i, slotType)
                        })
                    })
                }
                if (organEventStrategy['default']) {
                    organEventStrategy['default'].forEach(e => {
                        strategyFuncList.push({
                            'strategyModel': e,
                            'arg': args.concat(curItem, i, slotType)
                        })
                    })
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

        // 渲染MPM
        if (needLoadMpm && customData.modelData) {
            renderMpm(ccInstance, customData)
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}

/**
 * 
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @param {OrganChestCavityUpdateStrategyCustomData} customData 
 */
function renderMpm(ccInstance, customData) {
    /**@type {Internal.ServerPlayer} */
    let player = ccInstance.owner
    if (!player.inventory) {
        return
    }
    let modelData = customData.modelData
    modelData.refreshParts()
    modelData.updateTransate()
    $MpmPackets.sendNearby(player, new $PacketPlayerDataSend(player.getUuid(), modelData.writeToNBT()))
}