// priority: 500

ServerEvents.recipes(event => {
    let stressRanges = [
        [0, 5, 32],
        [5, 10, 64],
        [10, 15, 96],
        [15, 20, 128],
        [20, Infinity, 576]
    ]
    for (let range of stressRanges) {
        registerStressRange(range)
    }

    /**
     * @param {number[]} currentRange
     */
    function registerStressRange(currentRange) {
        event.recipes.custommachinery
            .custom_machine('kubejs:stress_extract', 1200)
            .requireFunctionToStart(ctx => {
                let owner = ctx.getMachine().owner
                if (!owner) return ctx.error('')
                let chestCavity = owner.chestCavityInstance
                if (!chestCavity) return ctx.error('')
                let stress = chestCavity.getOrganScore('kubejs:stress')
                return stress > currentRange[0] && stress <= currentRange[1] ? ctx.success() : ctx.error('')
            })
            .produceSU(256, currentRange[2])
            .resetOnError()
            .hide()
    }
})
