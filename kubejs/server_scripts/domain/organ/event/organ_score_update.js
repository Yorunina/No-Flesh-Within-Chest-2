// priority: 999
ChestCavityEvents.updateOrganScore(event => {
    const chestCavity = event.chestCavity
    if (!chestCavity) return
    ExtremeFitnessUpdateOrganScore(event)
})