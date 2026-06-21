// priority: 500
RegistryOrgan('kubejs:slime_colloid')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

const SlimColloidEntityGrowUpMap = {
    'minecraft:guardian': 'minecraft:elder_guardian',
    'cataclysm:netherite_ministrosity': 'cataclysm:netherite_monstrosity',
    'cataclysm:modern_remnant': 'cataclysm:ancient_remnant',
    'cataclysm:the_baby_leviathan': 'cataclysm:the_leviathan',
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemEntityInteractedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SlimeColloidEntityInteract(customData, event, organItem, organIndex, slotType) {
    const target = event.target
    const level = event.level
    const player = event.player
    if (event.getHand() != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    if (!(target instanceof $Mob)) return
    if (target.type == 'minecraft:tadpole') {
        target.biomancy$AgeUp()
        level.spawnParticles($ParticleTypes.HEART, true, target.getX(), target.getY(), target.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
    } else if (SlimColloidEntityGrowUpMap[target.type]) {
        $MobUtil.convertMobTo(level, target, SlimColloidEntityGrowUpMap[target.type], true, (old, elder) => { })
        level.spawnParticles($ParticleTypes.HEART, true, target.getX(), target.getY(), target.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
    } else if (target.isBaby()) {
        $MobUtil.convertToAdult(target)
        level.spawnParticles($ParticleTypes.HEART, true, target.getX(), target.getY(), target.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:slime_colloid')
        .addOnlyStrategy('entity_interact', SlimeColloidEntityInteract)
)
