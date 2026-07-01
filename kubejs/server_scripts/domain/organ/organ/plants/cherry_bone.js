// priority: 500
RegistryOrgan('kubejs:cherry_bone')
    .addScore('chestcavity:defense', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CherryBoneEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const sourceEntity = event.source.actual
    if (!sourceEntity) return
    let effectId = slotType == FertileSlot ? 'kubejs:putrid_toxins' : 'kubejs:vita_toxins'
    if (sourceEntity.hasEffect(effectId)) {
        let effect = sourceEntity.getEffect(effectId)
        if (effect.duration > event.amount * 20) {
            effect.setDuration(effect.duration - event.amount * 20)
            event.amount = 0
        } else {
            event.amount -= effect.duration / 20
            sourceEntity.removeEffect(effectId)
        }
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cherry_bone')
        .addOnlyStrategy('entity_be_hurt', CherryBoneEntityBeHurt)
)