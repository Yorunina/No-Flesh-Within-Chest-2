// priority: 999
/**
 * 遍历监听器 -> 器官物品 -> 对应事件 -> 策略方法
 * @type {Object<string, OrganStrategyModel>}
 */
const OrganStrategyMap = {}

/**
 * 遍历精英怪词条 -> 对应事件 -> 策略方法
 * @type {Object<string, ChampionEventModel>}
 */
const ChampionStrategyMap = {}

/**
 * 寻找事件类型 -> 寻找需要遍历的饰品类型 -> 饰品物品 -> 策略方法
 * @type {Object<string, Object<string, function(...any)[]>: void>>}
 */
const CuriosStrategyMap = {}

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

/**
 * 
 * @param {CuriosStrategyModel} strategyModel 
 */
function RegistryCuriosStrategy(strategyModel) {
    CuriosStrategyMap[strategyModel.itemId] = strategyModel
}