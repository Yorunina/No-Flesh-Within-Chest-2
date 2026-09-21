// priority: 2000
function TagEventModel(eventId) {
    this.eventId = eventId
    /**@type {function[]} */
    this.inits = []
    /**@type {function[]} */
    this.defers = []
    return this
}

TagEventModel.prototype = {
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
     * @param {OrganEventCustomData} customData
     * @param {any[]} args
     */
    run: function (entity, customData, args) {
        let optional = $ChestCavityEntity.of(entity)
        if (!optional.isPresent()) return
        let ccEntity = optional.get()
        let ccInstance = ccEntity.getChestCavityInstance()
        if (!ccInstance) return
        args.unshift(customData)
        this.inits.forEach(init => {
            init.apply(null, args)
        })
        if (this.eventId != 'chest_cavity_update') {
            let tagState = GetTagEffectState(ccInstance)
            if (!tagState || !tagState.byEvent || !tagState.byEvent[this.eventId]) {
                RebuildTagEffectState(ccInstance)
            }
        }
        RunTagStrategies(this.eventId, ccInstance, args)
        this.defers.forEach(defer => {
            defer.apply(null, args)
        })
    }
}
