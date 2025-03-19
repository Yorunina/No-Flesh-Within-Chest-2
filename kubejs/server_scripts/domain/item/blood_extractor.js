// priority: 500
ItemEvents.rightClicked('kubejs:blood_extractor', event => {
    const player = event.player
    const item = event.item
    if (player.getCooldowns().isOnCooldown('kubejs:blood_extractor') && !player.isCreative()) return

    let nbt = { organScores: {} }
    let ray = player.rayTrace(4, false)
    let target = player
    if (ray.entity && ray.entity.isAlive()) {
        target = ray.entity
    }
    
    if (!target.isAlive() || !target.chestCavityInstance) return
    target.getChestCavityInstance().getOrganScores().forEach((key, value) => {
        nbt.organScores[key] = value
    })

    let name = Text.empty()
    name.append(target.getName()).append(Text.translatable('item_name.kubejs.glass_vial.suffix'))
    player.give(Item.of('kubejs:glass_vial', nbt).withName(name))
    player.addItemCooldown(item, 20 * 5)
    return
})


ItemEvents.entityInteracted('kubejs:blood_extractor', event => {
    const player = event.player
    const target = event.target
    const item = event.item
    if (player.getCooldowns().isOnCooldown('kubejs:blood_extractor') && !player.isCreative()) return

    let nbt = { organScores: {} }
    if (!target.isAlive() || !target.chestCavityInstance) return
    target.getChestCavityInstance().getOrganScores().forEach((key, value) => {
        nbt.organScores[key] = value
    })
    let name = Text.empty()
    name.append(target.getName()).append(Text.translatable('item_name.kubejs.glass_vial.suffix'))
    player.give(Item.of('kubejs:glass_vial', nbt).withName(name))
    player.addItemCooldown(item, 20 * 5)
})
