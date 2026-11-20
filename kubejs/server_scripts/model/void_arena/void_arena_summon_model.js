// priority: 2000
/**
 * @typedef {
 *     level: Internal.ServerLevel,
 *     player: Internal.ServerPlayer,
 *     entity: Internal.LivingEntity
 * } VoidArenaSummonContext
 */

function VoidArenaSummonModel(id, threshold) {
    /** @type {String} */
    this.id = id
    /** @type {String} */
    this.summonId = id
    /** @type {number} */
    this.threshold = threshold
    /** @type {function(VoidArenaSummonContext): boolean} */
    this.entityKilledFunc = () => false
    /** @type {function(VoidArenaSummonContext): boolean} */
    this.conditionFunc = () => true
    /** @type {function(VoidArenaSummonContext): Internal.Entity} */
    this.createBossFunc = null
    /** @type {function(VoidArenaSummonContext): void} */
    this.lootFunc = null
    return this
}

VoidArenaSummonModel.prototype = {
    /**
     * 设置全服计数使用的竞技场召唤 id
     * @param {String} summonId
     */
    setSummonId: function (summonId) {
        this.summonId = summonId
        return this
    },
    /**
     * 判断一次生物击杀是否计入该召唤
     * @param {function(VoidArenaSummonContext): boolean} func
     */
    onEntityKilled: function (func) {
        this.entityKilledFunc = func
        return this
    },
    /**
     * 计数达标时的天气/群系等额外条件
     * @param {function(VoidArenaSummonContext): boolean} func
     */
    condition: function (func) {
        this.conditionFunc = func
        return this
    },
    /**
     * 生成进入竞技场的 Boss，返回尚未 spawn 的实体
     * @param {function(VoidArenaSummonContext): Internal.Entity} func
     */
    createBoss: function (func) {
        this.createBossFunc = func
        return this
    },
    /**
     * 生成该召唤类型的额外掉落物
     * @param {function(VoidArenaSummonContext): void} func
     */
    loot: function (func) {
        this.lootFunc = func
        return this
    },
}
