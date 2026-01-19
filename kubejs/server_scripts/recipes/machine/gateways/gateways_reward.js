// priority: 501
/**
 * 
 * @param {CustomMachine} machine 
 * @returns {Internal.List<Internal.Reward>}
 */
function EternalAltarGatewayReward(machine, levelIndicator, chaosIndicator, typeIndicator, extractantItem) {
    const rewardList = []
    const data = machine.getData()
    
    // 应用LevelModifier
    let levelModifier = data.getFloat('levelModifier')
    let levelIndicator = Math.max(levelIndicator + levelModifier, 0)
    data.remove('levelModifier')
    rewardList.push(new GatewayFunctionReward((ctx) => {
        if (data) data.putFloat('level_indicator', levelIndicator)
    }))
    // 应用ExtractantItem
}