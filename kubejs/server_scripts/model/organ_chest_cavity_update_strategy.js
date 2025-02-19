// priority: 900
function OrganChestCavityUpdateStrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.strategyMap = {}
    this.onlyStrategyMap = {}
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
        let onlySet = new Set()
        /**@type {Set<Internal.MpmPartData>} */
        let onlyMPMSet = new Set()
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let curItem = ccInv.getStackInSlot(i)
            if (!curItem || curItem.isEmpty()) continue
            let itemId = curItem.id
            // 唯一策略
            if (this.onlyStrategyMap[itemId] && !onlySet.has(itemId)) {
                onlySet.add(itemId)
                this.onlyStrategyMap[itemId].apply(null, args.concat(curItem, i))
            }
            // 策略
            if (this.strategyMap[itemId]) {
                this.strategyMap[itemId].apply(null, args.concat(curItem, i))
            }

            // MPM策略
            if (needLoadMpm) {
                if (this.mpmPartsStrategyMap[itemId] && !onlyMPMSet.has(itemId)) {
                    onlyMPMSet.add(itemId)
                    this.mpmPartsStrategyMap[itemId].apply(null, args.concat(curItem, i))
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