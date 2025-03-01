// priority: 500
MineMenuEvents.clickActionUseItem(event => {
    let nbt = event.item.serializeNBT()
    event.player.sendData('mine_menu_use_item', nbt)
})