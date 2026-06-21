// priority: 500
const StepplyStepHeightUpUUID = UUID.fromString('9A7E65B6-B43F-46A5-B08D-ECEA4561F717')
const StepplyStepHeightUpIdentifier = 'StepplyStepHeightUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function StepplyStepHeightUpOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:steppy')
    const attributeInstance = entity.getAttribute('forge:step_height_addition')
    if (!attributeInstance) return
    attributeInstance.removeModifier(StepplyStepHeightUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            StepplyStepHeightUpUUID,
            StepplyStepHeightUpIdentifier,
            organScoreValue,
            $Operation.ADDITION)
    )
}


RegistryOrganScoreAttribute('kubejs:steppy', StepplyStepHeightUpOrganScore)
