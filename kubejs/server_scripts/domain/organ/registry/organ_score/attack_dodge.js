// priority: 500
const AttackDodgeDodgeChanceUpUUID = UUID.fromString('E51758A0-56F0-435E-897F-BFC56EDA06A8')
const AttackDodgeDodgeChanceUpIdentifier = 'AttackDodgeDodgeChanceUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function AttackDodgeUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:attack_dodge')
    const attributeInstance = entity.getAttribute('attributeslib:dodge_chance')
    if (!attributeInstance) return
    attributeInstance.removeModifier(AttackDodgeDodgeChanceUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            AttackDodgeDodgeChanceUpUUID,
            AttackDodgeDodgeChanceUpIdentifier,
            organScoreValue / 100 * 3,
            $Operation.MULTIPLY_BASE)
    )
}


RegistryOrganScoreAttribute('kubejs:attack_dodge', AttackDodgeUpdateOrganScore)