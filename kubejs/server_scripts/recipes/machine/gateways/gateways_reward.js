// priority: 501
/**
 * 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 * @returns {Internal.List<Internal.Reward>}
 */
function EternalAltarGatewayReward(machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    const rewardList = []
    const data = machine.getData()
    if (!data) return rewardList
    // 应用LevelModifier
    let levelModifier = data.getFloat('levelModifier')
    data.remove('levelModifier')
    rewardList.push(new GatewayFunctionReward((ctx) => {
        let targetLevel = Clamp(levelIndicator + levelModifier, 0, 60)
        data.putFloat('level_indicator', targetLevel)
    }))
    // 应用auxiliaryItem
    if (auxiliaryItem && !auxiliaryItem.isEmpty()) {
        let typeModifier = GatewayAuxiliaryMaterialTypeMap[auxiliaryItem.getId()]
        let chaosModifier = GatewayAuxiliaryMaterialChaosMap[auxiliaryItem.getId()]
        rewardList.push(new GatewayFunctionReward((ctx) => {
            let targetChaos = Clamp(chaosIndicator + chaosModifier, 0, 60)
            data.put('chaos_indicator', targetChaos)

            let targetType = Clamp(typeIndicator + typeModifier, 0, 60)
            data.put('type_indicator', targetType)
        }))
    } else {
        data.put('chaos_indicator', Clamp(chaosIndicator - levelModifier - 1, 0, 60))
    }
    eternalAltarSubmitQuest(ctx.summoner(), levelIndicator, chaosIndicator, typeIndicator)

    // 应用extractantItem策略
    if (!extractantItem || extractantItem.isEmpty()) return rewardList
    const customData = {}
    customData.rewardList = []
    customData.levelIndicator = levelIndicator
    customData.chaosIndicator = chaosIndicator
    customData.typeIndicator = typeIndicator
    GatewayExtractantStrategy.run([extractantItem.getId()], [machine, extractantItem, auxiliaryItem], customData)
    DamageItem(extractantItem)
    return rewardList.concat(customData.rewardList)
}



/**
 * 
 * @param {Internal.ServerPlayer} summoner 
 * @param {number} levelIndicator 
 * @param {number} chaosIndicator 
 * @param {number} typeIndicator 
 */
function eternalAltarSubmitTypeQuest(summoner, levelIndicator, chaosIndicator, typeIndicator) {
    let taskIdList = ['eternal_altar_level_1']
    if (levelIndicator >= 5) taskIdList.push('eternal_altar_level_2')
    if (levelIndicator >= 10) taskIdList.push('eternal_altar_level_3')
    if (levelIndicator >= 30) taskIdList.push('eternal_altar_level_4')
    if (levelIndicator >= 50) taskIdList.push('eternal_altar_level_5')

    if (typeIndicator >= 0 && typeIndicator < 10) taskIdList.push('eternal_altar_type_1')
    else if (typeIndicator >= 10 && typeIndicator < 20) taskIdList.push('eternal_altar_type_2')
    else if (typeIndicator >= 20 && typeIndicator < 30) taskIdList.push('eternal_altar_type_3')
    else if (typeIndicator >= 30 && typeIndicator < 40) taskIdList.push('eternal_altar_type_4')
    else if (typeIndicator >= 40 && typeIndicator < 50) taskIdList.push('eternal_altar_type_5')
    else if (typeIndicator >= 50 && typeIndicator < 60) taskIdList.push('eternal_altar_type_6')

    if (typeIndicator == 8) taskIdList.push('eternal_altar_type_warden')
    else if (typeIndicator == 24) taskIdList.push('eternal_altar_type_ignis')
    else if (typeIndicator == 42) taskIdList.push('eternal_altar_type_harbinger')
    else if (typeIndicator == 51) taskIdList.push('eternal_altar_type_maledictus')

    MAAUtils.onKubeTasksFinish(taskIdList, summoner, (task, pPlayer, pTeamData) => {
        pTeamData.addProgress(task, 1)
    })
}


const GatewayExtractantStrategy = new StrategyModel()

function RegistryGatewayExtractantStrategy(id, func) {
    GatewayExtractantStrategy.addStrategy(id, func)
}

RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_1', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_2', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_3', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_4', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_5', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_6', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_7', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_8', ExtractantMaterialStrategy)
RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_9', ExtractantMaterialStrategy)
/**
 * @param {GatewaysCustomData} customData 
 * @param {CustomMachine} machine 
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 */
function ExtractantMaterialStrategy(customData, machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    let rewardList = []
    // todo 随机方法
    // ['minecraft:iron_ore', 'minecraft:deepslate_iron_ore', 'minecraft:copper_ore', 'minecraft:deepslate_copper_ore', 'minecraft:gold_ore', 'minecraft:deepslate_gold_ore', , 'create:zinc_ore', 'create:deepslate_zinc_ore']
    if (levelIndicator > 20) rewardList.push(Item.of('minecraft:ancient_debris'))
    customData.rewardList.push(new GatewayStackListReward([

    ]))
}