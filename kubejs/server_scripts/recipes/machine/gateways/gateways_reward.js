// priority: 501
/**
 * 
 * @param {CustomMachine} machine 
 * @param {Player} player
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 * @returns {Internal.List<Internal.Reward>}
 */
function EternalAltarGatewayReward(machine, player, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
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
    eternalAltarSubmitQuest(player, levelIndicator, chaosIndicator, typeIndicator)

    // 应用extractantItem策略
    if (!extractantItem || extractantItem.isEmpty()) return rewardList
    const customData = {}
    customData.rewardList = []
    customData.levelIndicator = levelIndicator
    customData.chaosIndicator = chaosIndicator
    customData.typeIndicator = typeIndicator
    GatewayExtractantStrategy.run([extractantItem.getId()], [machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem], customData)
    DamageItem(extractantItem)
    return rewardList.concat(customData.rewardList)
}

/**
 * 
 * @param {CustomMachine} machine 
 * @param {Player} player
 * @param {Number} levelIndicator 
 * @param {Number} chaosIndicator 
 * @param {Number} typeIndicator 
 * @param {Internal.ItemStack} extractantItem 
 * @param {Internal.ItemStack} auxiliaryItem 
 * @returns {Internal.List<Internal.Reward>}
 */
function EternalAltarGatewayArtificialTicketReward(machine, player, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem) {
    const rewardList = []
    const data = machine.getData()
    if (!data) return rewardList
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
    eternalAltarSubmitQuest(player, levelIndicator, chaosIndicator, typeIndicator)
    // Ticket特殊掉落物
    if (levelIndicator > 20 && typeIndicator < 10) {
        rewardList.push(new GatewayStackReward(Item.of('kubejs:eternal_miracle_ticket')))
    }
    // 应用extractantItem策略
    if (!extractantItem || extractantItem.isEmpty()) return rewardList
    const customData = {}
    customData.rewardList = []
    customData.levelIndicator = levelIndicator
    customData.chaosIndicator = chaosIndicator
    customData.typeIndicator = typeIndicator
    GatewayExtractantStrategy.run([extractantItem.getId()], [machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem, auxiliaryItem], customData)
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
function eternalAltarSubmitQuest(summoner, levelIndicator, chaosIndicator, typeIndicator) {
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
    if (levelIndicator > 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
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
    let stackList = []
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    if (levelIndicator > 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
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
    let stackList = []
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    if (levelIndicator > 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
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
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    if (levelIndicator > 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
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
    stackList.push(Item.of('minecraft:coal_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:iron_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 2)), 1)))
    stackList.push(Item.of('minecraft:copper_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random())), 1)))
    stackList.push(Item.of('minecraft:gold_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    stackList.push(Item.of('minecraft:zinc_ore', Math.max(Math.floor(levelIndicator * (1 + Math.random() * 0.5)), 1)))
    if (levelIndicator > 30) stackList.push(Item.of('minecraft:ancient_debris', Math.floor((levelIndicator - 30) * 0.2 + 1)))
    customData.rewardList.push(new GatewayStackListReward(stackList))
}