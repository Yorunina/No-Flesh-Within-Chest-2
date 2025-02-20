// priority: 999
/**
 * @type {Object<string, OrganStrategyModel>}
 */
const OrganStrategyMap = {}

function RegistryOrganStrategy(strategyModel) {
    OrganStrategyMap[strategyModel.itemId] = strategyModel
}
