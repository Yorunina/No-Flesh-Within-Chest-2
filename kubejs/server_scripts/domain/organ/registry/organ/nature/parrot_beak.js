// priority: 500
RegistryOrgan('kubejs:parrot_beak')
    .addScore('chestcavity:luck', 1.5)
    .setCanSpawn(true)

const ParrotBeakInstrumentMap = {
    'minecraft:creeper_head': 'entity.creeper.primed',
    'minecraft:dragon_head': 'entity.ender_dragon.ambient',
    'minecraft:piglin_head': 'entity.piglin.ambient',
    'minecraft:skeleton_skull': 'entity.skeleton.ambient',
    'minecraft:wither_skeleton_skull': 'entity.wither_skeleton.ambient',
    'minecraft:zombie_head': 'entity.zombie.ambient',
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ParrotBeakKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    Item.of('minecraft:creeper_head')
    let contentsItem = GetBundleContents(organItem)
    if (contentsItem.length <= 0) return
    let instrumentItem = contentsItem[0]
    if (instrumentItem.isEmpty() || !instrumentItem.isBlock()) return
    let instrumentName = ParrotBeakInstrumentMap[instrumentItem.id]
    if (!instrumentName) return
    level.playSound(null, player.getX(), player.getY(), player.getZ(), instrumentName, player.getSoundSource(), 1, 1)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:parrot_beak')
        .addOnlyStrategy('key_active', ParrotBeakKeyActive)
)
