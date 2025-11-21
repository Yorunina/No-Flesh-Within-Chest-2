// priority: 500
ItemEvents.rightClicked(event => {
    const item = event.item
    if (!item.hasTag('kubejs:unstable')) return
    const level = event.level
    const player = event.player
    
    level.createExplosion(player.x, player.y, player.z).explode()
    item.setCount(0)
})

ItemEvents.pickedUp('kubejs:unstable_matter', event => {
    const level = event.level
    const player = event.player
    level.createExplosion(player.x, player.y, player.z).explode()
})
