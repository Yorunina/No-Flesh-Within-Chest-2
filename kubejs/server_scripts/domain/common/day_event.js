// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    const level = server.getOverworld()
    if (level.getDayTime() % 24000 >= 20) return
    FinalDayEvent(event)
})