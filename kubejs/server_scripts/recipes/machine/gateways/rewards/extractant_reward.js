// priority: 502
const GatewayExtractantStrategy = new StrategyModel()

function RegistryGatewayExtractantStrategy(id, func) {
    GatewayExtractantStrategy.addStrategy(id, func)
}
/**
 * 
 * @param {number} value 
 * @returns {Internal.CompoundTag}
 */
function genCuriosAttriValueNbt(value) {
    let nbt = new $CompoundTag()
    nbt.putFloat('attriValue', value)
    return nbt
}

RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_1', ExtractantMaterial1Strategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_2', ExtractantMaterial2Strategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_3', ExtractantMaterial3Strategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_4', ExtractantMaterial4Strategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_5', ExtractantMaterial5Strategy)

/**
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterial1Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = []
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    if (levelIndicator >= 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:dark_witness_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() + 2) * 0.1, 2))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}

/**
 * todo
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterial2Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = []
    let ingots = RandomGetN(['tconstruct:steel_ingot', 'tconstruct:pig_iron_ingot', 'tconstruct:cinderslime_ingot', 'tconstruct:queens_slime_ingot', 'tconstruct:manyullyn_ingot', 'tconstruct:hepatizon_ingot', 'tconstruct:knightmetal_ingot', 'tconstruct:slimesteel_ingot', 'tconstruct:amethyst_bronze_ingot'], Math.min(Math.floor(levelIndicator / 10) + 2, 5))
    if (levelIndicator >= 30) {
        ingots.push(RandomGetN(['cataclysm:black_steel_ingot', 'cataclysm:ancient_metal_ingot', 'cataclysm:cursium_ingot', 'cataclysm:ignitium_ingot', 'cataclysm:witherite_ingot'], 2))
    }
    ingots.forEach(pIngot => {
        stackList.push(Item.of(pIngot, Math.floor(levelIndicator * Math.random() / 2) + 1))
    })
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:desperate_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() * 5 + 1) * 0.1, 2))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}

/**
 * todo
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterial3Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = []
    let randomCount = 1
    if (levelIndicator >= 30) randomCount++
    stackList.push(RandomGetN(TconModifierCrystalList, randomCount))
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:fear_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() * 3 + 2) * 0.01, 2))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}

/**
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterial4Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = []
    let moneyCount = levelIndicator * 50
    stackList.push(ConvertMoneyIntoCoinItemList(CoinList, moneyCount))
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:reunion_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() * 3 + 1) * 0.01, 2))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}


/**
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterial5Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = []
    let commonGemList = RandomGetN(['minecraft:redstone', 'minecraft:glowstone_dust', 'minecraft:diamond', 'minecraft:emerald', 'minecraft:lapis_lazuli', 'minecraft:amethyst_shard', 'minecraft:quartz', 'ars_nouveau:source_gem'], Math.floor(1 + Math.random() * 3))
    commonGemList.forEach(pGem => {
        stackList.push(Item.of(pGem, Math.floor(levelIndicator / 3 + 1)))
    })
    if (levelIndicator >= 30) {
        stackList.push(Item.of('ars_nouveau:greater_experience_gem', Math.max(levelIndicator - 27, 0)))
    }
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:cheat_death_memory', 1).withNBT(genCuriosAttriValueNbt(Math.floor(1 + levelIndicator / 20 * (1 + Math.random())))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}