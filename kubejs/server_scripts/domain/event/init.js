// priority: 999
/**
 * @type {Object<string, OrganStrategyModel>}
 */
const OrganStrategyMap = {}

/**
 * 
 * @param {OrganStrategyModel} strategyModel 
 */
function RegistryOrganStrategy(strategyModel) {
    OrganStrategyMap[strategyModel.itemId] = strategyModel
}
