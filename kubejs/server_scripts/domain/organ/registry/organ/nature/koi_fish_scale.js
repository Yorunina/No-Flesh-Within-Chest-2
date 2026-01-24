// priority: 500
RegistryOrgan('kubejs:koi_fish_scale')
    .addScore('chestcavity:knockback_resistant', -0.5)

/**
 * @param {AirdropDeathEventCustomData} customData 
 * @param {Internal.LivingEntityDeathEventJS} event 
 */
function KoiFishAirdropStrategy(customData, event) {
    customData.lootList = customData.lootList.concat(ConvertMoneyIntoCoinItemList(CoinList, Math.floor(Math.random() * 1500)))
}
RegistryAirDropDeathStrategy('koi_fish', KoiFishAirdropStrategy)

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

    let weightRandomModel = new WeightRandomModel()
    /**@type {Map<string, WeightRandomItem[]>} */
    const koiFishPool = GetCustomDataMap(player.chestCavityInstance, 'koiFishPool', new Map())
    const koiFishPoolCount = GetCustomDataMap(player.chestCavityInstance, 'koiFishPoolCount', 1)
    weightRandomModel.addWeightRandom('koi_fish', 1)
    koiFishPool.forEach((value, _) => {
        weightRandomModel.weightRandomList = weightRandomModel.weightRandomList.concat(value)
    })
    let typeList = weightRandomModel.getWeightRandomObjs(koiFishPoolCount)
    let airdropPos = getKoiAirDropSpawnLocation(level, player)
    let airdropEntity = getAirdropEntity(level, airdropPos, 'kubejs:airdrop_balloon_red', typeList)
    airdropEntity.spawn()

    let mapItem = $MapItem.create(level, airdropPos.x, airdropPos.z, 1, true, true)
    $MapItem.renderBiomePreviewMap(level, mapItem)
    $MapItemSavedData.addTargetDecoration(mapItem, airdropPos, "+", $MapDecorationType.RED_X)
    player.give(mapItem.withName(Text.translatable('map.kubejs.airdrop')))
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.book.page_turn', player.getSoundSource(), 0.5, 1)
    // 增强功能
    // CreateWaypoint(player, airdropPos, new Date().toLocaleString(), 0xFC4C00)
    player.addItemCooldown('kubejs:koi_fish_scale', 20 * 300)
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
function getKoiAirDropSpawnLocation(level, player) {
    const luck = Math.max(player.getLuck(), 0)
    const distance = Math.max(2000 - luck * 50, 100) + Math.random() * 100
    let deltaDim = Math.floor(Math.random() * 4) + 1
    let deltaX = Math.pow(-1, Math.floor(deltaDim / 2)) * Math.random() * distance
    let deltaZ = Math.pow(-1, Math.floor((deltaDim + 1) / 2)) * Math.sqrt(Math.pow(distance, 2) - Math.pow(deltaX, 2))
    let ranPosBlock = player.block.offset(deltaX, 0, deltaZ)

    let chunkX = Math.floor(ranPosBlock.x / 16)
    let chunkZ = Math.floor(ranPosBlock.z / 16)
    let blockX = ranPosBlock.x % 16
    let blockZ = ranPosBlock.z % 16

    let targetChunk = level.getChunk(chunkX, chunkZ, $ChunkStatus.SURFACE, true)
    let y = Math.min(targetChunk.getHeight('motion_blocking', blockX, blockZ), 255)
    y = y + 12 + Math.random() * 10
    return new BlockPos(ranPosBlock.x, y, ranPosBlock.z)
}


/**
 * @param {Internal.Level} level 
 * @param {BlockPos} pos
 * @param {Internal.EntityType_<any>} entityType
 * @param {string[]} types
 * @return {Internal.LivingEntity}
 */
function getAirdropEntity(level, pos, entityType, types) {
    /**@type {Internal.LivingEntity} */
    let airdropEntity = level.createEntity(entityType)
    airdropEntity.persistentData.put('types', NBT.toTagList(types))
    airdropEntity.setPosition(pos.x, pos.y, pos.z)
    return airdropEntity
}
