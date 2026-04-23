// priority: 500
const ExtremeFitnessHealthUpUUID = UUID.fromString('C6AC0C7D-7139-4144-B097-86B3C11770F2')
const ExtremeFitnessHealthUpIdentifier = 'ExtremeFitnessHealthUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function ExtremeFitnessUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:extreme_fitness')
    const attributeInstance = entity.getAttribute('minecraft:generic.max_health')
    if (!attributeInstance) return
    attributeInstance.removeModifier(ExtremeFitnessHealthUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            ExtremeFitnessHealthUpUUID,
            ExtremeFitnessHealthUpIdentifier,
            organScoreValue / 100 * 3,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:extreme_fitness', ExtremeFitnessUpdateOrganScore)