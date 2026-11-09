// priority: 2000
function CuriosEventModel(eventId) {
    /**@type {String} */
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}
CuriosEventModel.prototype = {
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
     * 逐策略隔离普通异常，事件中断继续向外传播。
     * @param {Internal.Entity} entity
     * @param {CuriosEventCustomData} customData
     * @param {any[]} args 
     */
    run: function (entity, customData, args) {
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })

        const curiosItemHandler = GetCuriosInventoryCap(entity)
        if (!curiosItemHandler) return
        let strategyFuncList = []
        curiosItemHandler.equippedCurios.allItems.forEach(pItem => {
            let strategyModel = CuriosStrategyMap[pItem.id]
            if (!strategyModel) return
            let curiosEventStrategy = strategyModel.strategyMap[this.eventId]
            if (!curiosEventStrategy) return
            curiosEventStrategy.forEach(e => {
                strategyFuncList.push(new PriorityArgsModel(e, args.concat(pItem)))
            })
        })

        if (strategyFuncList.length > 0) {
            strategyFuncList.sort((a, b) => {
                return b.getPriority() - a.getPriority()
            })
            strategyFuncList.forEach((model) => {
                let func = model.getFunc()
                let strategyArgs = model.getArgs()
                try {
                    func.apply(null, strategyArgs)
                } catch (err) {
                    HandleStrategyError(err, this.eventId, func.name)
                }
            })
        }

        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
    }
}
