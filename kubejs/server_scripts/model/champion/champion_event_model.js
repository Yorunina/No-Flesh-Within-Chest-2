// priority: 2000
function ChampionEventModel(eventId) {
    /**@type {String} */
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}
ChampionEventModel.prototype = {
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
     * @param {Internal.Entity} entity
     * @param {ChampionEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, customData, args) {
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        
        const persistentData = entity.persistentData
        const championTag = persistentData.getCompound('champion') ?? new $CompoundTag()
        let strategyFuncList = []
        Object.keys(championTag).forEach(championKey => {
            let championLevel = championTag.getInt(championKey)
            let strategyModel = ChampionStrategyMap[championKey]
            if (!strategyModel) return
            let championEventStrategy = strategyModel.strategyMap[this.eventId]
            if (!championEventStrategy) return
            championEventStrategy.forEach(e => {
                strategyFuncList.push(new PriorityArgsModel(e, args.concat(championKey, championLevel)))
            })
        })

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
    }
}