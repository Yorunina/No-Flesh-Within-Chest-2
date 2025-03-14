// priority: 999
/**
 * @type {Object<string, OrganStrategyModel>}
 */
publicField.NFWC.organManager.OrganStrategyMap = {}
const OrganStrategyMap = publicField.NFWC.organManager.OrganStrategyMap
function RegistryOrganStrategy(strategyModel) {
    OrganStrategyMap[strategyModel.itemId] = strategyModel
}

