// priority: 500
RegistryOrgan('kubejs:ladybug_wing')
    .addScore('kubejs:light_weight', 1)
    .addScore('chestcavity:speed', 1)
    .setCanSpawn(true)

/**
* @param {*} customData
* @param {Internal.LivingEntityDeathEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LadybugWingEntityKill(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.potionEffects.add('irons_spellbooks:true_invisibility', 20 * 10, 0, false, false)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ladybug_wing')
        .addOnlyStrategy('entity_kill', LadybugWingEntityKill)
)