// priority: 2000
/**
 * @param {Function} testFunc
 * @param {Function} applyFunc
 */
function ConditionStrategyModel(testFunc, applyFunc) {
    /**@type {Function} */
    this.testFunc = testFunc
    /**@type {Function} */
    this.applyFunc = applyFunc
    this.priority = 0
    return this
}

ConditionStrategyModel.prototype = {
    test: function (args) {
        return this.testFunc.apply(null, args)
    },
    run: function (args) {
        return this.applyFunc.apply(null, args)
    },
    setPriority: function (priority) {
        this.priority = priority
        return this
    }
}