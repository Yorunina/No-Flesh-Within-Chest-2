// priority: 500
const DragonBloodArmorShredUpUUID = UUID.fromString('5B066428-C671-4BE1-B5BA-B651C732AF8A')
const DragonBloodArmorShredUpIdentifier = 'DragonBloodArmorShredUp'
const DragonBloodAttackUpUUID = UUID.fromString('CAC1772C-7A0D-4F3B-91A0-0C4EE728EECE')
const DragonBloodAttackUpIdentifier = 'DragonBloodAttackUpIdentifier'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function DragonBloodUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = event.chestCavity.getOrganScore('kubejs:dragon_blood')
    const armorShredInstance = entity.getAttribute('attributeslib:armor_shred')
    if (armorShredInstance) {
        armorShredInstance.removeModifier(DragonBloodArmorShredUpUUID)
        if (organScoreValue != 0) {
            armorShredInstance.addPermanentModifier(
                new $AttributeModifier(
                    DragonBloodArmorShredUpUUID,
                    DragonBloodArmorShredUpIdentifier,
                    organScoreValue,
                    $Operation.ADDITION)
            )
        }
    }

    const attackDamageInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackDamageInstance) {
        attackDamageInstance.removeModifier(DragonBloodAttackUpUUID)
        if (organScoreValue != 0) {
            attackDamageInstance.addPermanentModifier(
                new $AttributeModifier(
                    DragonBloodAttackUpUUID,
                    DragonBloodAttackUpIdentifier,
                    organScoreValue / 100,
                    $Operation.MULTIPLY_BASE)
            )
        }
    }
}

RegistryOrganScoreAttribute('kubejs:dragon_blood', DragonBloodUpdateOrganScore)