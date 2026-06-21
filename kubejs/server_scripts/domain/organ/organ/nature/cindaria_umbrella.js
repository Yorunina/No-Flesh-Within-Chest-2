// priority: 500
RegistryOrgan('kubejs:cindaria_umbrella')
    .addScore('chestcavity:detoxification', 1)
    .addScore('chestcavity:defense', -1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.OrganAddStatusEffectJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CindariaUmbrellaOrganAddStatusEffect(customData, event, organItem, organIndex, slotType) {
    const effectInstance = event.effect
    if (effectInstance.getEffect().equals($MobEffects.POISON)) {
        event.setEffect(new $MobEffectInstance('minecraft:regeneration', 20 * 10))
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cindaria_umbrella')
        .addOnlyStrategy('organ_add_status_effect', CindariaUmbrellaOrganAddStatusEffect)
)