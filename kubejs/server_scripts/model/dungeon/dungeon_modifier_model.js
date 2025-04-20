// priority: 2001
function DungeonModifierModel(id) {
    /**@type {string} */
    this.id = id
    /**@type {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager, Internal.PathfinderMob, DungeonAttributeModel): void} */
    this.createEntityModifier = () => { }
    /**@type {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager, Internal.PathfinderMob, DungeonAttributeModel): void} */
    this.lootModifier = () => { }
    return this
}

DungeonModifierModel.prototype = {
    /**
     * 创建生物时会运行的modifierAction
     * @param {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager, Internal.PathfinderMob, DungeonAttributeModel): void} action 
     * @returns {DungeonModifierModel}
     */
    setCreateEntityAction: function (action) {
        this.createEntityModifier = action
        return this
    },
    /**
     * 生成战利品时，会运行的战利品修饰器
     * @param {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager, Internal.PathfinderMob, DungeonAttributeModel): void} action
     */
    setLootModifier: function (action) {
        this.lootModifier = action
        return this
    }
}