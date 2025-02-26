// priority: 1900
const MPMEventId = 'mpm_render'
function OrganChestCavityUpdateStrategyModel() {
    /**@type {Object<string, Object<string, function(...any)>: void>} */
    this.eventId = 'chest_cavity_update'
    this.mpmPartsStrategyMap = {}
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}

OrganChestCavityUpdateStrategyModel.prototype = {
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
    addMpmPartsStrategy: function (id, func) {
        this.mpmPartsStrategyMap[id] = func
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
     * @param {OrganChestCavityUpdateStrategyCustomData} customData
     */
    run: function (ccInstance, args, customData) {
        const ccInv = ccInstance.inventory
        args.unshift(customData)
        this.init.apply(null, args)
        let needLoadMpm = ccInstance.owner.isPlayer() && IsLoadedMPM
        const onlyMap = new Map()
        const onlyMPMMap = new Map()
        ccInstance.clearListenerMap()
        const invTypeData = ccInstance.getInventoryTypeData()
        for (let i = 0; i < ccInv.getSlots(); i++) {
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
            let slotType = invTypeData.getSlotType(i)

            let organEventStrategy = strategyModel.strategyMap[this.eventId]
            // 器官更新策略
            if (organEventStrategy) {
                if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
                    onlyMap.set(itemId, true)
                    organEventStrategy['only'].apply(null, args.concat(curItem, i, slotType))
                }
    
                if (organEventStrategy['default']) {
                    organEventStrategy['default'].apply(null, args.concat(curItem, i, slotType))
                }
            }


            // MPM策略
            if (needLoadMpm) {
                let mpmEventStrategy = strategyModel.strategyMap[MPMEventId]
                if (!mpmEventStrategy) continue
                if (mpmEventStrategy['only'] && !onlyMPMMap.has(itemId)) {
                    onlyMPMMap.set(itemId, true)
                    mpmEventStrategy['only'].apply(null, args.concat(curItem, i, slotType))
                }
                if (mpmEventStrategy['default']) {
                    mpmEventStrategy['default'].apply(null, args.concat(curItem, i, slotType))
                }
            }
        }

        // 渲染MPM
        if (needLoadMpm) {
            renderMpm(ccInstance, customData)
        }

        this.defer.apply(null, args)
        return
    },
}

/**
 * 
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @param {OrganChestCavityUpdateStrategyCustomData} customData 
 */
function renderMpm(ccInstance, customData) {
    let player = ccInstance.owner
    if (!player instanceof $ServerPlayer) return
    if (!player.inventory) {
        return
    }
    let modelData = $ModelData.get(player)
    let needUpdate = false
    if (modelData.mpmParts.length != customData.mpmParts.length) {
        needUpdate = true
    } else {
        for (let i = 0; i < modelData.mpmParts.length; i++) {
            let flag = true
            for (let j = 0; j < customData.mpmParts.length; j++) {
                if (modelData.mpmParts[i].partId.equals(customData.mpmParts[j].partId)) {
                    flag = false
                    break
                }
            }
            needUpdate = needUpdate || flag
        }
    }
    if (needUpdate) {
        modelData.mpmParts.clear()
        customData.mpmParts.forEach(mpmPart => {
            modelData.mpmParts.add(mpmPart)
        })
        modelData.refreshParts()
        modelData.updateTransate()
        $MpmPackets.sendNearby(player, new $PacketPlayerDataSend(player.getUuid(), modelData.writeToNBT()))
    }
}