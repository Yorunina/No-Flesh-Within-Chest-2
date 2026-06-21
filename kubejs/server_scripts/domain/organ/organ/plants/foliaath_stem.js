// priority: 500
RegistryOrgan('kubejs:foliaath_stem')
    .addScore('chestcavity:digestion', 1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.OrganAddStatusEffectJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FoliaathStemOrganAddStatusEffect(customData, event, organItem, organIndex, slotType) {
    const effectInstance = event.effect
    if (effectInstance.effect.isInstantenous()) return
    effectInstance.setDuration(effectInstance.getDuration() + 20 * 3)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:foliaath_stem')
        .addOnlyStrategy('organ_add_status_effect', FoliaathStemOrganAddStatusEffect)
)