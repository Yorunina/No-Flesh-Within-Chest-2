// priority: 999
const CuriosXpLevelChangeEvent = new CuriosEventModel('xp_level_change')

NativeEvents.onEvent($PlayerXpLevelChange, event => {
    let player = event.entity
    if (!player || !player.isPlayer()) return
    CuriosXpLevelChangeEvent.run(player, {}, [event])
})
