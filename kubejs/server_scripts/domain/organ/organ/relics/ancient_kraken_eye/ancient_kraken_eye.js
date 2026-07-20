// priority: 500
RegistryOrgan('kubejs:ancient_kraken_eye')
    .addScore('chestcavity:nutrition', 1)
    .addScore('chestcavity:digestion', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientKrakenEyeChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:real_black_hole', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientKrakenEyeTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:real_black_hole')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function AncientKrakenEyeEntityDeath(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    const entity = event.entity
    const level = event.level
    const radius = 16
    let center = entity.position()
    level.playSound(null, center.x(), center.y(), center.z(), 'irons_spellbooks:spell.black_hole.cast', 'ambient', 4, 1)

    const blackHole = new $BlackHole(level, entity)
    blackHole.setRadius(radius)
    blackHole.setKillOnEnd(true)
    blackHole.setPercentageDamage(true)
    blackHole.ignoreProjectileProtection(true)
    blackHole.setDamage(0.1)
    blackHole.setPos(center)
    level.addFreshEntity(blackHole)
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_kraken_eye')
        .addOnlyStrategy('chest_cavity_update', AncientKrakenEyeChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', AncientKrakenEyeTakeOff)
        .addOnlyStrategy('entity_death', AncientKrakenEyeEntityDeath)
)