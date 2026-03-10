// priority: 2000
function StrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.strategyMap = {}
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

StrategyModel.prototype = {
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
     * @param {String} id
     * @returns {boolean}
     */
    contains: function (id) {
        return this.strategyMap[id] != null
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
        ids.forEach(id => {
            if (!this.strategyMap[id]) return
            this.strategyMap[id].apply(null, args)
        })
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
    /**
     * @param {string[]} ids
     * @param {any[]} args 
     */
    runOnly: function (ids, args, customData) {
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        for (let id of ids) {
            if (!this.strategyMap[id]) return
            if (!this.strategyMap[id].apply(null, args)) return
        }
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
        return
    },
}
