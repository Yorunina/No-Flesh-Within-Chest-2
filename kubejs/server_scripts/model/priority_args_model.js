// priority: 2000
/**
 * @param {PriorityFuncModel} funcModel
 * @param {any} args
 */
function PriorityArgsModel(funcModel, args) {
    /**@type {PriorityFuncModel} */
    this.funcModel = funcModel
    /**@type {any} */
    this.args = args
    return this
}

PriorityArgsModel.prototype = {
    getFuncModel: function () {
        return this.funcModel
    },
    getFunc: function () {
        return this.funcModel.getFunc()
    },
    getPriority: function () {
        return this.funcModel.getPriority()
    },
    getArgs: function () {
        return this.args
    }
}


