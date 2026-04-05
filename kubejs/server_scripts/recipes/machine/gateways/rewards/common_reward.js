// priority: 502
const GatewaySpecialAwakeStoneWeightModel = new WeightRandomModel()
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_9', 1))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_8', 2))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_7', 3))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_6', 5))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_5', 5))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_4', 15))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_3', 20))
    .addWeightRandom(Item.of('kubejs:gateways_awake_stone_2', 25))
const GatewayAuxiliaryMaterialWeightModel = new WeightRandomModel()
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_9', 1))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_8', 2))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_7', 5))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_6', 10))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_4', 3))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_3', 6))
    .addWeightRandom(Item.of('kubejs:gateways_auxiliary_material_2', 12))
const GatewayExtractantMaterialWeightModel = new WeightRandomModel()
    .addWeightRandom(Item.of('kubejs:gateways_extractant_material_5', 30))
    .addWeightRandom(Item.of('kubejs:gateways_extractant_material_4', 20))
    .addWeightRandom(Item.of('kubejs:gateways_extractant_material_3', 15))
    .addWeightRandom(Item.of('kubejs:gateways_extractant_material_2', 30))
    .addWeightRandom(Item.of('kubejs:gateways_extractant_material_1', 50))
const GatewayTypeStackRewardMappingModel = new PiecewiseMappingModel()
    .addPiece(0, 10, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        RandomGetN(['minecraft:slime_ball', 'minecraft:lily_pad', 'minecraft:rabbit_foot', 'minecraft:pufferfish', 'minecraft:fermented_spider_eye', 'minecraft:sugar', 'minecraft:golden_carrot', 'minecraft:glistering_melon_slice'], 3).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (levelIndicator >= 30 && Math.random() > 0.2) stackList.push(Item.of('minecraft:name_tag', 1))
        return stackList
    })
    .addPiece(10, 20, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        stackList.push(Item.of('minecraft:emerald', Math.floor(10 + levelIndicator * (Math.random() + 0.5))))
        RandomGetN(['minecraft:rabbit_hide', 'minecraft:cactus', 'minecraft:gunpowder', 'minecraft:copper_ingot', 'minecraft:iron_ingot', 'minecraft:golden_apple', 'minecraft:melon_slice'], 2).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (levelIndicator >= 30 && Math.random() > 0.2) stackList.push(Item.of('minecraft:enchanted_golden_apple', 1))
        return stackList
    })
    .addPiece(20, 30, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        RandomGetN(['minecraft:glowstone', 'minecraft:shroomlight', 'minecraft:crying_obsidian', 'minecraft:gold_ingot', 'minecraft:blaze_rod', 'minecraft:ghast_tear', 'minecraft:magma_block', 'minecraft:magma_cream', 'minecraft:nether_wart'], 3).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (Math.random() > 0.9) stackList.push(Item.of('minecraft:dried_ghast', 1))
        if (levelIndicator >= 30 && Math.random() > 0.8) stackList.push(Item.of('minecraft:nether_star', 1))
        return stackList
    })
    .addPiece(30, 40, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        stackList.push(Item.of('minecraft:emerald', Math.floor(10 + levelIndicator * (Math.random() * 2 + 1))))
        RandomGetN(['minecraft:honeycomb', 'minecraft:ink_sac', 'minecraft:glow_ink_sac', 'minecraft:netherite_scrap', 'minecraft:experience_bottle', 'minecraft:scute', 'minecraft:armadillo_scute'], 2).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (levelIndicator >= 30 && Math.random() > 0.2) stackList.push(Item.of('minecraft:totem_of_undying', 1))
        return stackList
    })
    .addPiece(40, 50, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        RandomGetN(['graveyard:dark_iron_ingot', 'minecraft:feather', 'minecraft:bone', 'biomancy:flesh_bits', 'minecraft:diamond', 'minecraft:copper_ingot', 'minecraft:ender_pearl', 'minecraft:shulker_shell'], 3).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (levelIndicator >= 30) stackList.push(Item.of('minecraft:wither_skeleton_skull', 1))
        return stackList
    })
    .addPiece(50, 60, (levelIndicator, chaosIndicator, typeIndicator) => {
        let stackList = []
        RandomGetN(['minecraft:blue_ice', 'minecraft:prismarine_crystals', 'minecraft:prismarine_shard', 'minecraft:lapis_lazuli', 'minecraft:wet_sponge', 'minecraft:snow_block', 'minecraft:sea_pickle'], 2).forEach(pItem => {
            stackList.push(Item.of(pItem, 8 + Math.floor(levelIndicator / 2 * Math.random())))
        })
        if (levelIndicator >= 30 && Math.random() > 0.5) stackList.push(Item.of('minecraft:heart_of_the_sea', 1))
        return stackList
    })
/**
 * 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @returns {GatewayStackListReward}
 */
function eternalAltarGatewayTypeStackReward(levelIndicator, chaosIndicator, typeIndicator) {
    let stackList = []
    // 必定掉落基础唤醒材料 1 ~ 2 + 随机几种特殊唤醒材料
    stackList.push(Item.of('kubejs:gateways_awake_stone_1', Math.floor(1.2 + Math.random())))
    stackList = stackList.concat(GatewaySpecialAwakeStoneWeightModel.getWeightRandomObjs(Math.floor(1 + Math.random() * (levelIndicator / 20 + 1))))
    // 低概率掉落辅助材料，概率受层数影响
    if (Math.random() < 0.1 + 0.01 * levelIndicator) stackList.push(GatewayAuxiliaryMaterialWeightModel.getWeightRandomObj())
    // 低概率掉落提取物，概率受层数影响
    if (Math.random() < 0.2 + 0.01 * levelIndicator) stackList.push(GatewayExtractantMaterialWeightModel.getWeightRandomObj())
    
    let typeStackRewardFunc = GatewayTypeStackRewardMappingModel.getFirstValue(typeIndicator)
    if (typeStackRewardFunc) stackList = stackList.concat(typeStackRewardFunc(levelIndicator, chaosIndicator, typeIndicator))

    return new GatewayStackListReward(stackList)
}
