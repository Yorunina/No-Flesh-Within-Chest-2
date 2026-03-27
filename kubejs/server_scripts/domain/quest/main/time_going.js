// priority: 500
FTBQuestsEvents.customReward('time_going_1', event => {
    const player = event.player
    player.getStats().add(global.STAT_FINAL_TIMER, 1)
})
