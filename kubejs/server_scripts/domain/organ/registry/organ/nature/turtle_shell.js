// priority: 500
RegistryOrgan('kubejs:turtle_shell')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

const TurtleShellTempDefenseUpUUID = UUID.fromString('77C62F52-9FC7-4791-9417-65C0107F7719')
const TurtleShellTempDefenseIdentifier = 'TurtleShellTempDefenseUp'

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TurtleShellEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    if (!event.source.actual) return
    let attributeInstance = entity.getAttribute('minecraft:generic.armor')
    if (!attributeInstance) return
    let value = 1
    let oldModifier = attributeInstance.getModifier(TurtleShellTempDefenseUpUUID)
    if (oldModifier) value = oldModifier.amount + value
    let attributeModifier = new $AttributeModifier(TurtleShellTempDefenseUpUUID, TurtleShellTempDefenseIdentifier, value, $Operation.ADDITION)
    attributeInstance.removeModifier(TurtleShellTempDefenseUpUUID)
    attributeInstance.addPermanentModifier(attributeModifier)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function TurtleShellOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    let attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(TurtleShellTempDefenseUpUUID)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function TurtleShellEntityTick(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    if (entity.age % 100 != 0) return
    let attributeInstance = entity.getAttribute('minecraft:generic.armor')
    if (!attributeInstance) return
    let value = -1
    let oldModifier = attributeInstance.getModifier(TurtleShellTempDefenseUpUUID)
    if (oldModifier) value = oldModifier.amount + value

    attributeInstance.removeModifier(TurtleShellTempDefenseUpUUID)
    if (value <= 0) return
    let attributeModifier = new $AttributeModifier(TurtleShellTempDefenseUpUUID, 'TurtleShellTempDefenseUp', value, $Operation.ADDITION)
    attributeInstance.addPermanentModifier(attributeModifier)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:turtle_shell')
        .addOnlyStrategy('entity_be_hurt', TurtleShellEntityBeHurt)
        .addOnlyStrategy('organ_take_off', TurtleShellOrganTakeOff)
        .addOnlyStrategy('entity_tick', TurtleShellEntityTick)
)
