// priority: 900
const MPMEventId = 'mpm_render'
function OrganChestCavityUpdateStrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.eventId = 'chest_cavity_update'
    this.mpmPartsStrategyMap = {}
    this.init = (args) => { }
    this.defer = (args) => { }
    return this
}

OrganChestCavityUpdateStrategyModel.prototype = {
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
        const onlySet = new Set()
        
        /**@type {Set<Internal.MpmPartData>} */
        const onlyMPMSet = new Set()
        ccInstance.clearListenerMap()
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let curItem = ccInv.getStackInSlot(i)
            let itemId = curItem.id
            if (OrganStrategyMap[itemId]) {
                let strategyModel = OrganStrategyMap[itemId]
                strategyModel.relatedEventIds.forEach(eventId => {
                    ccInstance.addListener(eventId, i)
                })
            }

            // 执行常规更新器官效果策略
            if (!curItem || curItem.isEmpty()) continue
            
            let strategyModel = OrganStrategyMap[itemId]
            if (!strategyModel) continue
            let onlyOrganStrategy = strategyModel.onlyStrategyMap[this.eventId]
    
            if (onlyOrganStrategy && !onlySet.has(itemId)) {
                onlySet.add(itemId)
                onlyOrganStrategy.apply(null, args.concat(curItem, i))
            }
            let organStrategy = strategyModel.strategyMap[this.eventId]
            if (organStrategy) {
                organStrategy.apply(null, args.concat(curItem, i))
            }

            // MPM策略
            if (needLoadMpm) {
                let mpmStrategyModel = OrganStrategyMap[MPMEventId]
                if (!mpmStrategy) continue
                let onlyMpmStrategy = mpmStrategyModel.onlyStrategyMap[MPMEventId]
        
                if (onlyMpmStrategy && !onlyMPMSet.has(itemId)) {
                    onlyMPMSet.add(itemId)
                    onlyMpmStrategy.apply(null, args.concat(curItem, i))
                }
                let mpmStrategy = mpmStrategyModel.strategyMap[MPMEventId]
                if (mpmStrategy) {
                    mpmStrategy.apply(null, args.concat(curItem, i))
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
    if (!player.inventory) return
    /** @type {Internal.MpmPartData[]} */
    let mpmPartIdList = []
    for (let mpmPart of customData.mpmParts) {
        mpmPartIdList.push(mpmPart.partId) 
    }
    let modelData = $ModelData.get(player)
    let needUpdate = false
    if (modelData.mpmParts.length != mpmPartIdList.length) {
        needUpdate = true
    } else {
        for (let i = 0; i < modelData.mpmParts.length; i++) {
            if (modelData.mpmParts[i].partId != mpmPartIdList[i]) {
                needUpdate = true
                break
            }
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