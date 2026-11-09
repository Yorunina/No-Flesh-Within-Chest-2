// priority: 999
/**
 * Organ item -> event -> strategy functions
 * @type {Object<string, OrganStrategyModel>}
 */
const OrganStrategyMap = {}

/**
 * Tetra effect key -> event -> priority strategies
 * @type {Object<string, TetraOrganEffectModel>}
 */
const TetraOrganEffectStrategyMap = {}

/**
 * Tetra weapon effect key -> event -> priority strategies
 * @type {Object<string, TetraEffectStrategyModel>}
 */
const TetraEffectStrategyMap = {}

/**
 * Champion affix -> event -> strategy functions
 * @type {Object<string, ChampionEventModel>}
 */
const ChampionStrategyMap = {}

/**
 * Curio event -> item -> strategy functions
 * @type {Object<string, Object<string, function(...any)[]>: void>>}
 */
const CuriosStrategyMap = {}

/**
 * Chest cavity tag id -> tag strategy model
 * @type {Object<string, TagStrategyModel>}
 */
const TagStrategyMap = {}

/**
 * @param {OrganStrategyModel} strategyModel
 */
function RegistryOrganStrategy(strategyModel) {
    OrganStrategyMap[strategyModel.itemId] = strategyModel
}

/**
 * @param {TetraOrganEffectModel} strategyModel
 */
function RegistryTetraOrganEffectStrategy(strategyModel) {
    TetraOrganEffectStrategyMap[strategyModel.effectId] = strategyModel
}

/**
 * @param {TetraEffectStrategyModel} strategyModel
 */
function RegistryTetraEffectStrategy(strategyModel) {
    if (TetraEffectStrategyMap[strategyModel.effectId]) {
        throw new Error('Duplicate Tetra effect strategy: ' + strategyModel.effectId)
    }
    TetraEffectStrategyMap[strategyModel.effectId] = strategyModel
}

/**
 * @param {ChampionStrategyModel} strategyModel
 */
function RegistryChampionStrategy(strategyModel) {
    ChampionStrategyMap[strategyModel.id] = strategyModel
}

/**
 * @param {CuriosStrategyModel} strategyModel
 */
function RegistryCuriosStrategy(strategyModel) {
    CuriosStrategyMap[strategyModel.itemId] = strategyModel
}

/**
 * @param {TagStrategyModel} strategyModel
 */
function RegistryTagStrategy(strategyModel) {
    TagStrategyMap[strategyModel.tagId] = strategyModel
}
