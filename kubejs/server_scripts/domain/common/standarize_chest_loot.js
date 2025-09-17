// priority: 500
// 可能会导致影响玩家预期，先不使用此部分
// const ChestLootBaseStructStrategy = new StrategyModel()

// function RegistryChestLootBaseStructStrategy(id, func) {
//     ChestLootBaseStructStrategy.addStrategy(id, func)
// }
// /**
//  * 标准化箱子战利品
//  * 通过将原有的战利品内容全部删除，以各种依据，执行不同的战利品池判断策略和生成内容，来重新构建箱子战利品
//  * 理论上通过策略构建更为效率，但使用有限的判断能够降低后续维护成本以及玩家对于不同条件下战利品控制的理解成本
//  * @param {Internal.LootContextJS} event 
//  */
// function StandardizeChestLoot(event) {
//     event.loot.clear()
//     const level = event.level
//     const player = event.player
//     const blockPos = event.blockPos
//     let biomeHolder = level.getBiome(blockPos)
//     const biome = biomeHolder.get()
//     const height = blockPos.getY()
//     let optBiome = biomeHolder.unwrapKey()
//     const biomeKey = optBiome.isPresent() ? optBiome.get().location().toString() : null
//     let structResourceKey = GetPosInSturcture(level, blockPos)
//     const structKey = structResourceKey ? structResourceKey.location().toString() : null
//     const dimensionKey = level.getDimension().toString()

//     const lootTableList = []
//     const biomeTemp = biome.getBaseTemperature()
//     // 根据温度分配基于温度的战利品表
//     if (biomeTemp <= 0) {
//         lootTableList.push('kubejs:chests/temperature/cold')
//     } else if (biomeTemp < 0.5) {
//         lootTableList.push('kubejs:chests/temperature/cool')
//     } else if (biomeTemp <= 1.0) {
//         lootTableList.push('kubejs:chests/temperature/warm')
//     } else {
//         lootTableList.push('kubejs:chests/temperature/hot')
//     }

//     // 根据世界高度分配的战利品表
//     if (height < -30) {
//         lootTableList.push('kubejs:chests/height/deep_rock')
//     } else if (height > 100) {
//         lootTableList.push('kubejs:chests/height/high_sky')
//     }

//     if (dimensionKey) {

//     }

//     if (structKey) {

//     }
// }