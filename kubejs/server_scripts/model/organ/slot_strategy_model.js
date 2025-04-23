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
        priority = priority ? priority: 0
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[id]['default'].push({
            'func': func,
            'priority': priority,
        })
        return this
    },
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     * @param {number} priority
     */
    addOnlyStrategy: function (id, func, priority) {
        priority = priority ? priority: 0
        if (!this.strategyMap[id]) {
            this.strategyMap[id] = {
                'default': [],
                'only': [],
            }
        }
        this.strategyMap[id]['only'].push({
            'func': func,
            'priority': priority,
        })
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
            if (strategyModel['only'] && !onlyMap.has(itemId)) {
                onlyMap.set(itemId, true)
                strategyModel['only'].forEach(e => {
                    strategyFuncList.push({
                        'strategyModel': e,
                        'arg': args.concat(curItem, i)
                    })
                })
            }
            if (strategyModel['default']) {
                strategyModel['default'].forEach(e => {
                    strategyFuncList.push({
                        'strategyModel': e,
                        'arg': args.concat(curItem, i)
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