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
        event.recipes.custommachinery
            .custom_machine('kubejs:stress_extract', 1200)
            .requireFunctionToStart(ctx => {
                let owner = ctx.getMachine().owner
                if (!owner) return ctx.error('')
                let chestCavity = owner.chestCavityInstance
                if (!chestCavity) return ctx.error('')
                let stress = chestCavity.getOrganScore('kubejs:stress')
                return stress > range[0] && stress <= range[1] ? ctx.success() : ctx.error('')
            })
            .produceSU(256, range[2])
            .resetOnError()
            .hide()
    }
})
