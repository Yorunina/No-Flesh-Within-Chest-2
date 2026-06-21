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
    if (Math.random() > 1) return
    let digestion = chestCavity.getOrganScore('chestcavity:digestion')
    let growthCnt = Math.min(Math.floor(digestion / 5) + 1, 1)
    const hasTentaclesHarvester = GetCustomDataMap(chestCavity, 'hasTentaclesHarvester', 0)
    const hasWhirlisprigStarGem = GetCustomDataMap(chestCavity, 'hasWhirlisprigStarGem', 0)
    const radius = 4
    const diameter = radius * 2 + 1
    for (let i = 0; i < growthCnt; i++) {
        let rx = Math.floor(Math.random() * diameter) - radius
        let rz = Math.floor(Math.random() * diameter) - radius
        let entityBlockPos = entity.getOnPos()
        let targetBlockPos = new BlockPos(entityBlockPos.x + rx, Math.ceil(entityBlockPos.y) + 1, entityBlockPos.z + rz)
        let targetBlockState = level.getBlockState(targetBlockPos)
        if ($BoneMealItem.applyBonemeal(Item.of('minecraft:bone_meal'), level, targetBlockPos, null)) {
            level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
            level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
        }

        if (hasTentaclesHarvester == 0) return
        if (targetBlockState.hasProperty(BlockProperties.AGE_7) && targetBlockState.getValue(BlockProperties.AGE_7).intValue() == 7) {
            let lootContext = new $LootParamsBuilder(level)
                .withParameter(LootContextParams.ORIGIN, new Vec3d(targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ()))
                .withParameter(LootContextParams.BLOCK_STATE, targetBlockState)
                .withParameter(LootContextParams.THIS_ENTITY, entity)
                .withParameter(LootContextParams.TOOL, entity.getMainHandItem())
            targetBlockState.getDrops(lootContext).forEach(itemStack => {
                $Containers.dropItemStack(level, targetBlockPos.getX(), targetBlockPos.getY(), targetBlockPos.getZ(), itemStack.copy())
            })
            level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.2, targetBlockPos.y + 0.3, targetBlockPos.z - 0.4, 0, 0.1, 0, 2, 0)
            level.spawnParticles('minecraft:glow', true, targetBlockPos.x + 0.1, targetBlockPos.y + 0.2, targetBlockPos.z + 0.3, 0, 0.1, 0, 2, 0)
            if (hasWhirlisprigStarGem == 0) {
                targetBlockState = targetBlockState.setValue(BlockProperties.AGE_7, Int2Integer(0))
                level.setBlockAndUpdate(targetBlockPos, targetBlockState)
            }
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rootling_ectoplasm')
        .addOnlyStrategy('entity_tick', RootlingEctoplasmEntityTick)
)

