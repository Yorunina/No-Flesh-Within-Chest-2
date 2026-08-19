// priority: 500
RegistryOrgan('kubejs:rootling_ectoplasm')
    .addScore('kubejs:extreme_fitness', 2)
    .addScore('kubejs:photosynthesis', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RootlingEctoplasmEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const chestCavity = event.chestCavity
    if (entity.isPlayer() && !entity.isCrouching()) return
    const radius = 4
    const entityPos = entity.position()

    for (let l = 0; l <= radius; ++l) {
        for (let i = 0; i <= l; i = i > 0 ? -i : 1 - i) {
            for (let j = i < l && i > -l ? l : 0; j <= l; j = j > 0 ? -j : 1 - j) {
                let targetBlockPos = new BlockPos(Math.floor(entityPos.x() + i), Math.ceil(entityPos.y()), Math.floor(entityPos.z() + j))
                let targetBlockState = level.getBlockState(targetBlockPos)
                let targetBlock = targetBlockState.block

                if (targetBlock instanceof $BonemealableBlock && targetBlock.isValidBonemealTarget(level, targetBlockPos, targetBlockState, false)) {
                    if (targetBlock.isBonemealSuccess(level, level.random, targetBlockPos, targetBlockState)) {
                        targetBlock.performBonemeal(level, level.random, targetBlockPos, targetBlockState)
                        level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
                        level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
                    }
                }

                if (GetCustomDataMap(chestCavity, 'hasTentaclesHarvester', 0) == 0) continue

                if (targetBlockState.hasProperty(BlockProperties.AGE_2) && targetBlockState.getValue(BlockProperties.AGE_2).intValue() == 2) {
                    let lootContext = new $LootParamsBuilder(level)
                        .withParameter($LootContextParams.ORIGIN, new Vec3d(targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ()))
                        .withParameter($LootContextParams.BLOCK_STATE, targetBlockState)
                        .withParameter($LootContextParams.THIS_ENTITY, entity)
                        .withParameter($LootContextParams.TOOL, entity.getMainHandItem())
                    targetBlockState.getDrops(lootContext).forEach(pItem => {
                        $Containers.dropItemStack(level, targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ(), pItem)
                    })
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
                    if (GetCustomDataMap(chestCavity, 'hasWhirlisprigStarGem', 0) == 0) {
                        targetBlockState = targetBlockState.setValue(BlockProperties.AGE_2, Int2Integer(0))
                        level.setBlockAndUpdate(targetBlockPos, targetBlockState)
                    }
                    continue
                }

                if (targetBlockState.hasProperty(BlockProperties.AGE_7) && targetBlockState.getValue(BlockProperties.AGE_7).intValue() == 7 && !(targetBlock instanceof $StemGrownBlock)) {
                    let lootContext = new $LootParamsBuilder(level)
                        .withParameter($LootContextParams.ORIGIN, new Vec3d(targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ()))
                        .withParameter($LootContextParams.BLOCK_STATE, targetBlockState)
                        .withParameter($LootContextParams.THIS_ENTITY, entity)
                        .withParameter($LootContextParams.TOOL, entity.getMainHandItem())
                    targetBlockState.getDrops(lootContext).forEach(pItem => {
                        $Containers.dropItemStack(level, targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ(), pItem)
                    })
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
                    if (GetCustomDataMap(chestCavity, 'hasWhirlisprigStarGem', 0) == 0) {
                        targetBlockState = targetBlockState.setValue(BlockProperties.AGE_7, Int2Integer(0))
                        level.setBlockAndUpdate(targetBlockPos, targetBlockState)
                    }
                    continue
                }

                let pBlockEntity = level.getBlockEntity(targetBlockPos)
                if (pBlockEntity instanceof $CropBlockEntity) {
                    if (!pBlockEntity.canBeHarvested()) continue

                    pBlockEntity.getHarvestProducts(pItem => {
                        $Containers.dropItemStack(level, targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ(), pItem)
                    })
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
                    level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
                    if (GetCustomDataMap(chestCavity, 'hasWhirlisprigStarGem', 0) == 0) {
                        pBlockEntity.setGrowthStage(pBlockEntity.getPlant().getGrowthStageAfterHarvest())
                    }
                    pBlockEntity.getPlant().onHarvest(pBlockEntity, entity)
                }
            }
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rootling_ectoplasm')
        .addOnlyStrategy('entity_tick', RootlingEctoplasmEntityTick)
)

