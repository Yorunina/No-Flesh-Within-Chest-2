// priority: 500
RegistryOrgan('kubejs:cherry_bone')
    .addScore('chestcavity:defense', 1.5)
    .addScore('chestcavity:photosynthesis', 0.5)

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
    if (!source) return
    if (sourceEntity.hasEffect('kubejs:vita_toxins')) {
        let effect = sourceEntity.getEffect('kubejs:vita_toxins')
        if (effect.duration > event.amount * 20) {
            effect.setDuration(Math.max(effect.duration - event.amount * 20, 10))
            event.amount = 0
        }
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cherry_bone')
        .addOnlyStrategy('entity_be_hurt', CherryBoneEntityBeHurt)
)