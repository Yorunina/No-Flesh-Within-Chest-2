// priority: 2000

function PriorityStrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.strategyMap = {}
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

PriorityStrategyModel.prototype = {
    /**
     * @param {String} id
     * @param {function(any[]): void} func
     */
    addStrategy: function (id, func, priority) {
        this.strategyMap[id] = new PriorityFuncModel(func, priority)
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
     * @param {string[]} ids
     * @param {any[]} args 
     */
    run: function (ids, args, customData) {
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        let strategyFuncList = []
        ids.forEach(id => {
            if (!this.strategyMap[id]) return
            strategyFuncList.push(this.strategyMap[id])
        })
        if (strategyFuncList.length > 0) {
            strategyFuncList.sort((a, b) => {
                return b.getPriority() - a.getPriority()
            })
            strategyFuncList.forEach((model) => {
                model.getFunc().apply(null, args)
            })
        }
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}
