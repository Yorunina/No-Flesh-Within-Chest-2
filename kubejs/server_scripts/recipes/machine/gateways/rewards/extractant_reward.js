// priority: 502
const GatewayExtractantStrategy = new StrategyModel()
const ExtractantMaterial2LootWeightModel = new WeightRandomModel()
    .addWeightRandom(Item.of('minecraft:zombie_spawn_egg'), 20)
    .addWeightRandom(Item.of('minecraft:skeleton_spawn_egg'), 20)
    .addWeightRandom(Item.of('minecraft:frog_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:creeper_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:cow_spawn_egg'), 10)
    .addWeightRandom(Item.of('minecraft:cod_spawn_egg'), 2)
    .addWeightRandom(Item.of('minecraft:chicken_spawn_egg'), 10)
    .addWeightRandom(Item.of('minecraft:cat_spawn_egg'), 5)
    .addWeightRandom(Item.of('minecraft:blaze_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:squid_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:villager_spawn_egg'), 5)
    .addWeightRandom(Item.of('minecraft:witch_spawn_egg'), 5)
    .addWeightRandom(Item.of('minecraft:wolf_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:spider_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:armadillo_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:axolotl_spawn_egg'), 3)
    .addWeightRandom(Item.of('minecraft:pig_spawn_egg'), 10)
    .addWeightRandom(Item.of('minecraft:pufferfish_spawn_egg'), 1)
    .addWeightRandom(Item.of('minecraft:rabbit_spawn_egg'), 5)
    .addWeightRandom(Item.of('minecraft:sheep_spawn_egg'), 10)
    .addWeightRandom(Item.of('minecraft:slime_spawn_egg'), 7)

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
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 3)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 3)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    if (levelIndicator >= 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.5 + 1)))
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:dark_witness_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() * 2 + 1) * 0.1, 2))))
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
function ExtractantMaterial2Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = ExtractantMaterial2LootWeightModel.getWeightRandomObjs(Math.min(Math.floor(2 + levelIndicator / 10), 5))
    if (levelIndicator >= 30 && Math.random() < 0.2) stackList.push(Item.of('minecraft:spawner'))
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:desperate_memory', 1).withNBT(genCuriosAttriValueNbt(FloorFix(levelIndicator * (Math.random() * 5 + 1) * 0.1, 2))))
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
function ExtractantMaterial3Strategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let stackList = [Item.of('kubejs:experience_injection', { value: NBT.i(Math.pow(levelIndicator, 2) + levelIndicator * 32 + 127) })]
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
    let stackList = RandomGetN(
        [Item.of('minecraft:potion', '{Potion:"potioncore:disorganization"}'), Item.of('minecraft:potion', '{Potion:"potioncore:perplexity"}'), Item.of('minecraft:potion', '{Potion:"potioncore:purity"}'), Item.of('minecraft:potion', '{Potion:"biomancy:primordial_infestation"}'), Item.of('minecraft:potion', '{Potion:"potioncore:spawn_teleport"}'), Item.of('minecraft:potion', '{Potion:"potioncore:surface_teleport"}'), Item.of('minecraft:potion', '{Potion:"potioncore:launch"}'), Item.of('minecraft:potion', '{Potion:"potioncore:climb"}'), Item.of('minecraft:potion', '{Potion:"potioncore:burst"}'), Item.of('minecraft:potion', '{Potion:"potioncore:love"}'), Item.of('minecraft:potion', '{Potion:"minecraft:slow_falling"}'), Item.of('minecraft:potion', '{Potion:"potioncore:antidote"}'), Item.of('minecraft:potion', '{Potion:"potioncore:reach"}'), Item.of('minecraft:potion', '{Potion:"potioncore:random_teleport"}'), Item.of('minecraft:potion', '{Potion:"ars_nouveau:recovery_potion"}'), Item.of('minecraft:potion', '{Potion:"potioncore:flight"}')], Math.min(Math.floor(2 + levelIndicator / 10), 5))
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
    let commonGemList = RandomGetN(['minecraft:redstone', 'minecraft:glowstone_dust', 'minecraft:diamond', 'minecraft:emerald', 'minecraft:lapis_lazuli', 'minecraft:amethyst_shard', 'minecraft:quartz', 'ars_nouveau:source_gem'], Math.floor(2 + Math.random() * 3))
    commonGemList.forEach(pGem => {
        stackList.push(Item.of(pGem, Math.floor(levelIndicator + 1)))
    })
    if (Math.random() < levelIndicator * 0.01 + 0.2) stackList.push(Item.of('kubejs:cheat_death_memory', 1).withNBT(genCuriosAttriValueNbt(Math.floor(1 + levelIndicator / 20 * (1 + Math.random())))))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}