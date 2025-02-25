// priority: 2000

function StrategyModel() {
    /**@type {Object<string, function(...any): void>} */
    this.strategyMap = {}
    this.init = (args) => {}
    this.defer = (args) => {}
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
     * @param {string[]} ids
     * @param {any[]} args 
     */
    run: function (ids, args, customData) {
        args.unshift(customData)
        this.init.apply(null, args)
        ids.forEach(id => {
            if (!this.strategyMap[id]) return
            this.strategyMap[id].apply(null, args)
        })
        this.defer.apply(null, args)
        return
    },
}
