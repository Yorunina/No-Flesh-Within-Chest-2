// priority: 2000

/**
 * @param {string} eventId
 */
function TetraEffectEventModel(eventId) {
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

TetraEffectEventModel.prototype = {
    /**
     * @param {function(...any): void} initFunc
     */
    addInit: function (initFunc) {
        this.inits.push(initFunc)
        return this
    },
    /**
     * @param {function(...any): void} deferFunc
     */
    addDefer: function (deferFunc) {
        this.defers.push(deferFunc)
        return this
    },
    /**
     * 策略按优先级执行，事件取消后停止分发。
     * @param {Internal.Entity} entity effect 来源实体
     * @param {Object} customData 本次分发的临时数据
     * @param {any[]} args 事件及附加参数
     */
    run: function (entity, customData, args) {
        let event = args[0]
        let projectileStack = null
        if (entity instanceof $Projectile) {
            if (entity instanceof $TetraThrownModularItemEntity) projectileStack = entity.getThrownStack()
            entity = entity.getOwner()
        }
        if (!entity || !entity.isLiving()) return
        let eventArgs = [customData].concat(args)
        this.inits.forEach(init => {
            init.apply(null, eventArgs)
        })

        let sources = TetraEquipmentEffectCache.getEffectSources(entity, projectileStack)
        let strategyFuncList = []
        let queue = (handler, source) => {
            let model = new PriorityArgsModel(handler, eventArgs.concat(source))
            model.order = strategyFuncList.length
            strategyFuncList.push(model)
        }
        Object.keys(TetraEffectStrategyMap).forEach(effectId => {
            let group = sources.get(effectId)
            if (!group) return
            let tetraEventStrategy = TetraEffectStrategyMap[effectId].strategyMap[this.eventId]
            if (!tetraEventStrategy) return

            tetraEventStrategy['only'].forEach(entry => {
                let availableSources = entry.availableSources
                let strongest = null
                group.sources.forEach(source => {
                    if (availableSources && availableSources.length && !availableSources.includes(source.location)) return
                    if (!strongest || source.level > strongest.level) {
                        strongest = source
                    }
                })
                if (strongest) {
                    queue(entry.handler, strongest)
                }
            })
            tetraEventStrategy['default'].forEach(entry => {
                let availableSources = entry.availableSources
                group.sources.forEach(source => {
                    if (availableSources && availableSources.length && !availableSources.includes(source.location)) return
                    queue(entry.handler, source)
                })
            })
        })

        strategyFuncList.sort((a, b) => {
            return b.getPriority() - a.getPriority() || a.order - b.order
        })
        for (let model of strategyFuncList) {
            if (event && event.isCanceled && event.isCanceled()) break
            let func = model.getFunc()
            let strategyArgs = model.getArgs()
            try {
                func.apply(null, strategyArgs)
            } catch (err) {
                HandleStrategyError(err, this.eventId, func.name)
            }
        }
        this.defers.forEach(defer => {
            defer.apply(null, eventArgs)
        })
    },
}
