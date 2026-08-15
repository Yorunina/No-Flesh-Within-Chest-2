// priority: 500
ServerEvents.tick(event => {
    const server = event.server
    if (server.tickCount % 20 != 0) return
    if (!AStages.serverHasStage('ftb_restart', server)) return
    // 多少分钟一天
    let ms = FloorFix(20 / GetDaySpeed(), 3)
    if (ms <= 0.01) {
        AStages.removeStageFromServer('ftb_restart', server)
        AStages.addStageToServer('ftb_restart_success', server)
        SetDaySpeed(1)
        SetNightSpeed(1)
        return
    } else if (ms <= 1) {
        let speed = 20 / (ms - 0.005)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    } else if (ms <= 2) {
        let speed = 20 / (ms - 0.01)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    } else {
        let speed = 20 / (ms - 0.1)
        SetDaySpeed(speed)
        SetNightSpeed(speed)
    }
})