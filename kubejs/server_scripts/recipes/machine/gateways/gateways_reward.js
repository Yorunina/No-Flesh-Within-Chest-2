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
        data.putFloat('level_indicator', Clamp(levelIndicator + levelModifier, 0, 60))
    }))
    // 应用auxiliaryItem
    if (auxiliaryItem && !auxiliaryItem.isEmpty()) {
        let typeModifier = GatewayAuxiliaryMaterialTypeMap[auxiliaryItem.getId()]
        let chaosModifier = GatewayAuxiliaryMaterialChaosMap[auxiliaryItem.getId()]
        rewardList.push(new GatewayFunctionReward((ctx) => {
            data.put('chaos_indicator', Clamp(chaosIndicator + chaosModifier, 0, 60))
            data.put('type_indicator', Clamp(typeIndicator + typeModifier, 0, 60))
        }))
    }

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


const GatewayExtractantStrategy = new StrategyModel()

function RegistryGatewayExtractantStrategy(id, func) {
    GatewayExtractantStrategy.addStrategy(id, func)
}

RegistryGatewayExtractantStrategy('kubejs:gateways_extractant_material_1', ExtractantMaterialStrategy)
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
    
    customData.rewardList.push(new GatewayStackListReward([]))
}