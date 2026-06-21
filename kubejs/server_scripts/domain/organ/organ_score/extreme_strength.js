// priority: 500
const ExtremeStrengthAttackUpUUID = UUID.fromString('1318AAC8-AF51-4087-870F-D5C8CB42AA45')
const ExtremeStrengthAttackUpIdentifier = 'ExtremeStrengthAttackUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function ExtremeStrengthUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:extreme_strength')
    const attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(ExtremeStrengthAttackUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            ExtremeStrengthAttackUpUUID,
            ExtremeStrengthAttackUpIdentifier,
            organScoreValue / 100 * 3,
            $Operation.MULTIPLY_BASE)
    )
}

RegistryOrganScoreAttribute('kubejs:extreme_strength', ExtremeStrengthUpdateOrganScore)