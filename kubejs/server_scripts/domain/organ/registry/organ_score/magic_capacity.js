// priority: 500
const MagicCapacityMaxManaUpUUID = UUID.fromString('AA675869-C356-4E0E-AC8B-D745422B7F98')
const MagicCapacityMaxManaUpIdentifier = 'MagicCapacityMaxManaUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function MagicCapacityMaxManaUpUpdateOrganScore(event) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:magic_capacity')
    const attributeInstance = entity.getAttribute('ars_nouveau:ars_nouveau.perk.max_mana')
    if (!attributeInstance) return
    attributeInstance.removeModifier(MagicCapacityMaxManaUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            MagicCapacityMaxManaUpUUID,
            MagicCapacityMaxManaUpIdentifier,
            organScoreValue * 10,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:magic_capacity', MagicCapacityMaxManaUpUpdateOrganScore)
