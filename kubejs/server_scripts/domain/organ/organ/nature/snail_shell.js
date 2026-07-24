
// priority: 500
RegistryOrgan('kubejs:snail_shell')
    .addScore('chestcavity:defense', 2)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SnailShellEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.hasEffect('minecraft:resistance')) {
        let effect = entity.getEffect('minecraft:resistance')
        entity.potionEffects.add('minecraft:resistance', 20 * 10, Math.min(effect.getAmplifier() + 1, 4), false, false)
    }
    if (entity.hasEffect('minecraft:slowness')) {
        let effect = entity.getEffect('minecraft:slowness')
        entity.potionEffects.add('minecraft:slowness', 20 * 10, Math.min(effect.getAmplifier() + 1, 4), false, false)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:snail_shell')
        .addOnlyStrategy('entity_be_hurt', SnailShellEntityBeHurt)
)