// priority: 2000
/**
 * @param {Function} func
 * @param {number} priority
 */
function PriorityFuncModel(func, priority) {
    /**@type {Function} */
    this.func = func
    /**@type {number} */
    this.priority = priority ? priority : 0
    return this
}

PriorityFuncModel.prototype = {
    getFunc: function () {
        return this.func
    },
    getPriority: function () {
        return this.priority
    }
}