// priority: 500
RegistryOrgan('kubejs:pure_color_reaction')
    .addScore('chestcavity:detoxification', 1.0)
    .addScore('chestcavity:filtration', -1.0)

const PureColorReactionTempAttackUpUUID = UUID.fromString('A83844BB-9390-4766-8152-C1E33315066D')
const PureColorReactionTempAttackUpIdentifier = 'PureColorReactionAttackUp'
const PureColorReactionTempHealthUpUUID = UUID.fromString('5E0EE00B-906C-4D24-9AB2-5F9E69713372')
const PureColorReactionTempHealthUpIdentifier = 'PureColorReactionHealthUp'
const PureColorReactionTempArmorUpUUID = UUID.fromString('83C520C7-1615-4F84-B594-8168194B465E')
const PureColorReactionTempArmorUpIdentifier = 'PureColorReactionArmorUp'

/**
* 
* @param {OrganEventCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PureColorReactionEntityTick(customData, event, organItem, organIndex, slotType) {
    if (slotType != TransdimensionalMechanized) return
    const entity = event.entity
    const server = event.server
    if (entity.age % 1200 != 0) return
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    if (!targetRelativePos) return
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())
    if (!compressBlockItem) return

    let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()
    CompactMachineUtil.insertItem(server, room, 'up', Item.of('kubejs:rainbow_compound', 64), false)

    let itemHandlerLazyOpt = CompactMachineUtil.getItemHandler(server, room, 'down')
    let r = 0, g = 0, b = 0
    if (!itemHandlerLazyOpt.isPresent()) return
    let itemHandler = itemHandlerLazyOpt.resolve().get()
    for (let i = 0; i < itemHandler.getSlots(); i++) {
        let pItem = itemHandler.getStackInSlot(i)
        if (pItem.is('#forge:dyes')) {
            let dyeRatio = DyeRGBRatioConfig[pItem.getId()]
            r += dyeRatio.r * pItem.getCount()
            g += dyeRatio.g * pItem.getCount()
            b += dyeRatio.b * pItem.getCount()
            itemHandler.extractItem(i, pItem.getCount(), false)
        }
    }

    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) {
        attackAttr.removePermanentModifier(PureColorReactionTempAttackUpUUID)
        attackAttr.addPermanentModifier(new $AttributeModifier(PureColorReactionTempAttackUpUUID, PureColorReactionTempAttackUpIdentifier, r * 0.01, 'multiply_base'))
    }

    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.removePermanentModifier(PureColorReactionTempArmorUpUUID)
        armorAttr.addPermanentModifier(new $AttributeModifier(PureColorReactionTempArmorUpUUID, PureColorReactionTempArmorUpIdentifier, b * 0.01, 'multiply_base'))
    }

    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.removePermanentModifier(PureColorReactionTempHealthUpUUID)
        healthAttr.addPermanentModifier(new $AttributeModifier(PureColorReactionTempHealthUpUUID, PureColorReactionTempHealthUpIdentifier, g * 0.01, 'multiply_base'))
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pure_color_reaction')
        .addOnlyStrategy('entity_tick', PureColorReactionEntityTick)
)