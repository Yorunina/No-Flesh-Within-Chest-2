// priority: 999
const CuriosNewDayEvent = new CuriosEventModel('new_day')
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return

    const level = server.getOverworld()
    const dayTime = level.getDayTime()
    let dayCount = Math.floor(dayTime / 24000)
    const persistentData = server.persistentData
    if (!persistentData.contains('dayCount')) return persistentData.putInt('dayCount', dayCount)

    let lastDayCount = persistentData.getInt('dayCount')
    if (lastDayCount == dayCount) return
    persistentData.putInt('dayCount', dayCount)
    let customData = {
        dayCount: dayCount,
    }
    server.playerList.players.forEach(pPlayer => {
        CuriosNewDayEvent.run(pPlayer, customData, [event])
    })
})