// priority: 500
RegistryOrgan('kubejs:pressurized_arm')
    .addScore('kubejs:extreme_strength', 1)
    .addScore('chestcavity:knockback_resistant', 1)

const PressurizedArmFluidConfig = {
    'minecraft:lava': 0.05,
    'createdieselgenerators:crude_oil': 0.05,
    'createdieselgenerators:ethanol': 0.1,
    'createdieselgenerators:plant_oil': 0.1,
    'create:honey': 0.15,
    'create:chocolate': 0.15,
    'createdieselgenerators:gasoline': 0.2,
    'createdieselgenerators:biodiesel': 0.2,
    'createdieselgenerators:diesel': 0.3,
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PressurizedArmKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const server = event.server
    if (!player) return
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.inventoryTypeData

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    if (!targetRelativePos) return
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())
    if (!compressBlockItem) return

    let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()
    let fluidOpt = CompactMachineUtil.getFluid(server, room, 'down')
    if (!fluidOpt.isPresent()) return
    let fluid = fluidOpt.get()
    let fluidType = String(fluid.fluid.fluidType)
    if (!PressurizedArmFluidConfig[fluidType]) return
    let attackUp = fluid.getAmount() * PressurizedArmFluidConfig[fluidType]
    fluid.setAmount(0)

    SetCustomDataMap(chestCavity, 'pressurizedArmAttackUp', attackUp)
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText(attackUp.toFixed(0))
    SetOrganEffect(chestCavity, organEffect)
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PressurizedArmTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'pressurizedArmAttackUp', 0)
    if (entity.isPlayer()) RemoveOrganEffect(chestCavity, 'kubejs:pressurized_arm')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PressurizedArmDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    event.amount = event.amount + GetCustomDataMap(chestCavity, 'pressurizedArmAttackUp', 0)
    SetCustomDataMap(chestCavity, 'pressurizedArmAttackUp', 0)
    RemoveOrganEffect(chestCavity, 'kubejs:pressurized_arm')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pressurized_arm')
        .addOnlyStrategy('key_active', PressurizedArmKeyActive)
        .addOnlyStrategy('organ_take_off', PressurizedArmTakeOff)
        .addOnlyStrategy('entity_do_damage', PressurizedArmDoDamage)
)