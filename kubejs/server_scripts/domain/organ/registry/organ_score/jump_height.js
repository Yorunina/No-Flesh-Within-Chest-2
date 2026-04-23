// priority: 500
const JumpHeightJumpHeightUpUUID = UUID.fromString('825EFFDC-149D-4049-8D74-05F34DE18A05')
const JumpHeightJumpHeightUpIdentifier = 'JumpHeightJumpHeightUp'

/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function JumpHeightOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:jump_height')
    const attributeInstance = entity.getAttribute('potioncore:jump_height')
    if (!attributeInstance) return
    attributeInstance.removeModifier(JumpHeightJumpHeightUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            JumpHeightJumpHeightUpUUID,
            JumpHeightJumpHeightUpIdentifier,
            organScoreValue / 3,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:jump_height', JumpHeightOrganScore)
