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
    /** @type {number} */
    this.threshold = threshold
    /** @type {function(Internal.LivingEntity): boolean} */
    this.matchFunc = entity => false
    /** @type {function(VoidArenaSummonContext): boolean} */
    this.conditionFunc = () => true
    /** @type {function(VoidArenaSummonContext): boolean} */
    this.canStartFunc = null
    /** @type {function(VoidArenaSummonContext): Internal.Entity} */
    this.createBossFunc = null
    return this
}

VoidArenaSummonModel.prototype = {
    /**
     * 判断击杀目标是否计入该召唤
     * @param {function(Internal.LivingEntity): boolean} func
     */
    match: function (func) {
        this.matchFunc = func
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
     * 覆盖默认的竞技场可用判断
     * @param {function(VoidArenaSummonContext): boolean} func
     */
    canStart: function (func) {
        this.canStartFunc = func
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
}
