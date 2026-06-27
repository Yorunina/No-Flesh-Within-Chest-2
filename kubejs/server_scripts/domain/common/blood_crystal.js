// priority: 500
ItemEvents.rightClicked('kubejs:blood_crystal', event => {
    const player = event.player
    if (player.getHealth() == player.getMaxHealth()) return
    const item = event.item
    player.heal(2)
    item.shrink(1)
})