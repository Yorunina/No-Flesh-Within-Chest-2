// priority: 500
RegistryOrgan('kubejs:koi_fish_scale')
    .addScore('chestcavity:knockback_resistant', -0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function KoiFishScaleKeyActive(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const player = event.player

    if (level.getDimension() != 'minecraft:overworld') return
    let lootTableId = 'kubejs:koi_fish_loot/weather_clear'
    if (level.isThundering()) lootTableId = 'kubejs:koi_fish_loot/weather_thunder'
    else if (level.isRaining()) lootTableId = 'kubejs:koi_fish_loot/weather_rain'
    let chestPos = getKoiChestSpawnLocation(level, player)

    let mapItem = $MapItem.create(level, chestPos.x, chestPos.z, 1, true, true)
    $MapItem.renderBiomePreviewMap(level, mapItem)
    $MapItemSavedData.addTargetDecoration(mapItem, chestPos, '+', $MapDecorationType.RED_X)
    player.give(mapItem.withName(Text.translatable('map.kubejs.airdrop')))
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.book.page_turn', player.getSoundSource(), 0.5, 1)

    GenLootrChestWithLootTable(level, chestPos, lootTableId)
    // 增强功能
    // CreateWaypoint(player, chestPos, new Date().toLocaleString(), 0xFC4C00)
    player.addItemCooldown('kubejs:koi_fish_scale', 20 * 180)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:koi_fish_scale')
        .addOnlyStrategy('key_active', KoiFishScaleKeyActive, 1)
)

/**
 * @param {Internal.Level} level 
 * @param {Internal.ServerPlayer} player 
 * @return {BlockPos}
 */
function getKoiChestSpawnLocation(level, player) {
    const luck = Math.max(player.getLuck(), 0)
    const distance = Math.max(1500 - luck * 50, 100) + Math.random() * 100

    let deltaDim = Math.floor(Math.random() * 4) + 1
    let deltaX = Math.pow(-1, Math.floor(deltaDim / 2)) * Math.random() * distance
    let deltaZ = Math.pow(-1, Math.floor((deltaDim + 1) / 2)) * Math.sqrt(Math.pow(distance, 2) - Math.pow(deltaX, 2))
    let ranPosBlock = player.block.offset(deltaX, 0, deltaZ)

    let chunkX = Math.floor(ranPosBlock.x / 16)
    let chunkZ = Math.floor(ranPosBlock.z / 16)
    let blockX = ranPosBlock.x % 16
    let blockZ = ranPosBlock.z % 16

    let targetChunk = level.getChunk(chunkX, chunkZ, 'surface', true)
    let y = Math.min(targetChunk.getHeight('motion_blocking', blockX, blockZ), 255)
    return new BlockPos(ranPosBlock.x, y - 4, ranPosBlock.z)
}
