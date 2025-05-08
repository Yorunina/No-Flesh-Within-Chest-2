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
     * @param {String} id
     * @param {function(any[]): void} func
     * @param {number} priority
     */
    addStrategy: function (id, func, priority) {
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[id]['default'].push(new PriorityFuncModel(func, priority))
        return this
    },
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     * @param {number} priority
     */
    addOnlyStrategy: function (id, func, priority) {
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[id]['only'].push(new PriorityFuncModel(func, priority))
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
     * @param {Internal.LivingEntity} entity
     * @param {OrganEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, customData, args) {
        const chestCavity = entity.chestCavityInstance
        const ccInv = chestCavity.inventory
        const invTypeData = chestCavity.getInventoryTypeData()
        args.unshift(customData)
        const onlyMap = new Map()
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        let strategyFuncList = []
        for (let i = 0; i < ccInv.getSlots(); i++) {
            let curItem = ccInv.getStackInSlot(i)
            if (!curItem || curItem.isEmpty()) continue
            let slotType = invTypeData.getSlotType(i)
            let strategyModel = this.strategyMap[slotType]
            if (!strategyModel) continue
            if (strategyModel['only'] && !onlyMap.has(slotType)) {
                onlyMap.set(slotType, true)
                strategyModel['only'].forEach(e => {
                    strategyFuncList.push(new PriorityArgsModel(e, args.concat(curItem, i, slotType)))
                })
            }
            if (strategyModel['default']) {
                strategyModel['default'].forEach(e => {
                    strategyFuncList.push(new PriorityArgsModel(e, args.concat(curItem, i, slotType)))
                })
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