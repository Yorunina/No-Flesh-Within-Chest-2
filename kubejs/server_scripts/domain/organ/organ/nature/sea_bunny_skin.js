// priority: 500
RegistryOrgan('kubejs:sea_bunny_skin')
    .addScore('kubejs:extreme_fitness', 2)
    .addScore('chestcavity:swim_speed', 1.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SeaBunnyGlandEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity instanceof $ServerPlayer) {
        let magicData = entity.getMagicData()
        let curMana = magicData.getMana()
        if (curMana <= 30) return
        magicData.setMana(curMana - 30)
    }
    entity.potionEffects.add('irons_spellbooks:true_invisibility', 20 * 3, 0, false, false)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sea_bunny_skin')
        .addOnlyStrategy('entity_be_hurt', SeaBunnyGlandEntityBeHurt)
)