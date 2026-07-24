
// priority: 500
RegistryOrgan('kubejs:stick_bug_exoskeleton')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

/**
* @param {*} customData
* @param {Internal.OpenedEntityTickJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function StickBugExoskeletonEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.isMoving()) return
    if (entity.hasEffect('irons_spellbooks:true_invisibility') && entity.getEffect('irons_spellbooks:true_invisibility').getDuration() > 20 * 1) return
    entity.potionEffects.add('irons_spellbooks:true_invisibility', 20 * 3, 0, false, false)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:stick_bug_exoskeleton')
        .addOnlyStrategy('entity_tick', StickBugExoskeletonEntityTick)
)