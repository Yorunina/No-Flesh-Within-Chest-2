// priority: 500
RegistryOrgan('kubejs:ore_vein_generator')
    .addScore('chestcavity:nerves', -1)
    .addScore('chestcavity:defense', 1)

const OreVeinSize2OreCountConfig = {
    3: 6,
    5: 12,
    7: 32,
    9: 64,
    11: 128,
    13: 256,
}
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function OreVeinGeneratorKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const server = event.server

    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.inventoryTypeData

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    if (!targetRelativePos) return
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())
    if (!compressBlockItem) return

    let roomPosOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomPosOpt || roomPosOpt.isEmpty()) return
    const roomPos = roomPosOpt.get()
    const roomOpt = CompactMachineUtil.getRoomData(server, roomPos)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()
    const roomBounds = room.getRoomBounds()
    if (!roomBounds) return

    const dimOpt = CompactMachineUtil.getCompactDimension(server)
    if (!dimOpt || dimOpt.isEmpty()) return
    const level = dimOpt.get()

    const veinModel = new SerpentineVeinModel()
        .setOreCount(OreVeinSize2OreCountConfig[room.getSize().internalSize])
        .setFillBlock(Block.getBlock('minecraft:deepslate').defaultBlockState())
    GetBundleContents(organItem).forEach((pStack) => {
        let pItem = pStack.getItem()
        if (!(pItem instanceof $BlockItem)) return
        let pBlock = pItem.getBlock()
        veinModel.addVein(pBlock.defaultBlockState(), Math.floor(Math.random() * 10 + 2))
    })
    veinModel.generate(level, roomBounds)
    player.addItemCooldown(organItem, 20 * 300)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ore_vein_generator')
        .addOnlyStrategy('key_active', OreVeinGeneratorKeyActive)
)
