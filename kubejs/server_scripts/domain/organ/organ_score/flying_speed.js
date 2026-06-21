// priority: 500
const FlyingSpeedFlyingSpeedUpUUID = UUID.fromString('1D5FD74D-0EC6-4EA8-BA7F-65CC3B76C388')
const FlyingSpeedFlyingSpeedUpIdentifier = 'FlyingSpeedFlyingSpeedUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function FlyingSpeedUpdateOrganScore(event) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:flying_speed')
    const attributeInstance = entity.getAttribute('minecraft:generic.flying_speed')
    if (!attributeInstance) return
    attributeInstance.removeModifier(FlyingSpeedFlyingSpeedUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            FlyingSpeedFlyingSpeedUpUUID,
            FlyingSpeedFlyingSpeedUpIdentifier,
            organScoreValue / 100 * 3,
            $Operation.MULTIPLY_BASE)
    )
}

RegistryOrganScoreAttribute('kubejs:flying_speed', FlyingSpeedUpdateOrganScore)

