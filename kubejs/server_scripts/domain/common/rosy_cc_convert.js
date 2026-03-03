// priority: 500
/**
 * @param {Internal.LivingDamageEvent} event 
 */
function RosyChestCavityConvert(event) {
    if (!event.source.is($DamageTypes.DROWN)) return
    const entity = event.entity
    if (!entity.isPlayer() || entity.getHealth() > 4) return
    if (!entity.isEyeInFluidType(Fluid.getType('kubejs:molten_rose_quartz').getFluidType())) return
    const chestCavity = entity.chestCavityInstance
    if (!chestCavity || chestCavity.getInventoryType() == 'kubejs:cc_inventory_types/rose') return
    if (chestCavity.getOrganScore('kubejs:rosy') < 10) return
    chestCavity.setInventoryType('kubejs:cc_inventory_types/rose')
    entity.level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), 'ui.toast.challenge_complete', entity.getSoundSource(), 0.5, 1)
    
    MAAUtils.onKubeTaskFinish('rose_cc_convert', entity, (task, pPlayer, teamData) => teamData.addProgress(task, 1))
    entity.potionEffects.add('minecraft:water_breathing', 20 * 60)
}