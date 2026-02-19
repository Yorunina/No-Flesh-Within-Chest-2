// priority: 500
FTBQuestsEvents.customReward('balance_mantle_energy', event => {
    const server = event.server
    DecreaseEternalWinterCounter(server, 1)
})