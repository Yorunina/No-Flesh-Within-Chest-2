// priority: 500
MineMenuEvents.clickActionUseItem(event => {
    const item = event.item
    if (!item.hasTag('kubejs:key_active') && !item.hasTag('kubejs:key_active_only')) return
    let nbt = event.item.serializeNBT()
    event.player.sendData('mine_menu_use_item', nbt)
})