// priority: 999
/**
 * @type {Object<string, OrganStrategyModel>}
 */
const OrganStrategyMap = {}
/**
 * @type {Object<string, ChampionEventModel>}
 */
const ChampionStrategyMap = {}

/**
 * 
 * @param {OrganStrategyModel} strategyModel 
 */
function RegistryOrganStrategy(strategyModel) {
    OrganStrategyMap[strategyModel.itemId] = strategyModel
}

/**
 * 
 * @param {ChampionStrategyModel} strategyModel 
 */
function RegistryChampionStrategy(strategyModel) {
    ChampionStrategyMap[strategyModel.id] = strategyModel
}