// priority: 500
ItemEvents.rightClicked('stick', event => {
    const player = event.player
    const offHandItem = player.getOffHandItem()
    let roomOpt = CompactMachineUtil.getRoomFromItem(offHandItem)
    if (roomOpt.isEmpty()) return
    const room = roomOpt.get()
    const server = event.server
    // player.give(CompactMachineUtil.extractItem(server, room, 'up', 0, 64, false))
    CompactMachineUtil.insertItem(server, room, 'east', Item.of('minecraft:gold_ingot'), false)
})