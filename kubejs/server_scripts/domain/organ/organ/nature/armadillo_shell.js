
// priority: 500
RegistryOrgan('kubejs:armadillo_shell')
    .addScore('chestcavity:defense', 2)
    .setCanSpawn(true)

const ArmadilloShellDefenseUpUUID = UUID.fromString('683322F6-174C-40F2-A282-818A148F2A8B')
const ArmadilloShellDefenseUpIdentifier = 'ArmadilloShellDefenseUp'

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ArmadilloShellEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    let attr = entity.getAttribute('minecraft:generic.armor')
    if (entity.isMoving()) {
        attr.removePermanentModifier(ArmadilloShellDefenseUpUUID)
        return
    }
    let modifier = new $AttributeModifier(ArmadilloShellDefenseUpUUID, ArmadilloShellDefenseUpIdentifier, 1, $Operation.MULTIPLY_BASE)
    if (attr.hasModifier(modifier)) return
    attr.addPermanentModifier(modifier)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ArmadilloShellChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!(entity instanceof $LivingEntity)) return
    let attr = entity.getAttribute('minecraft:generic.armor')
    attr.removePermanentModifier(ArmadilloShellDefenseUpUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:armadillo_shell')
        .addOnlyStrategy('entity_tick', ArmadilloShellEntityTick)
        .addOnlyStrategy('organ_take_off', ArmadilloShellChestCavityTakeOff)
)