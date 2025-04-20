// priority: 1000
const DungeonCreateEntityModifierStrategy = new StrategyModel()
const DungeonLootModifierStrategy = new StrategyModel()
const DungeonStructModifierStrategy = new StrategyModel()


/**
 * 
 * @param {DungeonModifierModel} modifier 
 */
function RegisterDungeonModifier(modifier) {
    if (modifier.createEntityModifier) {
        DungeonCreateEntityModifierStrategy.register(modifier.id, modifier.createEntityModifier)
    }
    if (modifier.lootModifier) {
        DungeonLootModifierStrategy.register(modifier.id, modifier.lootModifier)
    }
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {LoquatAreaManager} area 
 * @param {Internal.PathfinderMob} entity 
 * @param {DungeonAttributeModel} dungeonAttr
 */
function ApplyCreateEntityModifier(level, context, areaManager, entity, dungeonAttr) {
    if (dungeonAttr.modifierList.length > 0) {
        DungeonCreateEntityModifierStrategy.run(dungeonAttr.modifierList, [level, context, areaManager, entity, dungeonAttr], {})
    }
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {LoquatAreaManager} area 
 * @param {Internal.ItemStack[]} lootList 
 * @param {DungeonAttributeModel} dungeonAttr
 */
function ApplyLootModifier(level, context, areaManager, lootList, dungeonAttr) {
    if (dungeonAttr.modifierList.length > 0) {
        DungeonLootModifierStrategy.run(dungeonAttr.modifierList, [level, context, areaManager, lootList, dungeonAttr], {})
    }
}
