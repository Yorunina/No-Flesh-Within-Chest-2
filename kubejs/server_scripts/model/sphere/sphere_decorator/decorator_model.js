// priority: 900

/**
 * 装饰器模型构建
 * @param {string} type
 * @param {function(Internal.Level, SphereModel, BlockPos)} predictor
 * @param {function(Internal.Level, SphereModel, BlockPos)} action
 * @returns 
 */
function SphereDecoratorModel(type, predictor, action) {
    this.type = type
    /**
     * 预测器仅用于处理通用的判断逻辑，用于判断这里是否能够执行某个action，而不需要关心sphere的相对状态
     * 如果需要进行sphere的状态的判断，则需要在type处新增枚举，并且在每个sphere的对应位置设置好切入点
     * 这么做的原因主要是sphere的逻辑和定义存在差异性，需要差分式的设计以避免后续扩展性的问题
     */
    this.predictor = predictor
    /**
     * 执行器，用于处理具体的逻辑，这里的pos是相对于sphere的相对位置，而不是全局的绝对位置
     */
    this.action = action
}


/**
 * 按照decorators的type去打包到不同的执行器中
 */
function SphereDecoratorPackerModel() {
    this.inner = []
    this.shell = []
    this.ring = []
    this.global = []
}

SphereDecoratorPackerModel.prototype = {
    /**
     * 添加装饰器
     * @param {SphereDecoratorModel} decorator
     */
    addDecorator: function (decorator) {
        switch (decorator.type) {
            case 'inner':
                // 球壳内部空闲空间
                this.inner.push(decorator)
                break
            case 'shell':
                // 下半部球壳
                this.shell.push(decorator)
                break
            case 'ring':
                // 星环
                this.ring.push(decorator)
                break
            case 'global':
                // 全局
                this.global.push(decorator)
                break
            default:
                break
        }
    },
    /**
     * 执行球壳内装饰器
     * @param {Internal.Level} level
     * @param {SphereModel} sphere
     * @param {BlockPos} offset
     */
    runInnerDecorators: function (level, sphere, offset) {
        for (let i = 0; i < this.inner.length; i++) {
            let decorator = this.inner[i]
            if (decorator.predictor(level, sphere, offset)) {
                decorator.action(level, sphere, offset)
            }
        }
    },
    /**
     * 执行球壳装饰器
     * @param {Internal.Level} level
     * @param {SphereModel} sphere
     * @param {BlockPos} offset
     */
    runShellDecorators: function (level, sphere, offset) {
        for (let i = 0; i < this.shell.length; i++) {
            let decorator = this.shell[i]
            if (decorator.predictor(level, sphere, offset)) {
                decorator.action(level, sphere, offset)
            }
        }
    },
    /**
     * 执行星环装饰器
     * @param {Internal.Level} level
     * @param {SphereModel} sphere
     * @param {BlockPos} offset
     */
    runRingDecorators: function (level, sphere, offset) {
        for (let i = 0; i < this.ring.length; i++) {
            let decorator = this.ring[i]
            if (decorator.predictor(level, sphere, offset)) {
                decorator.action(level, sphere, offset)
            }
        }
    },
    /**
     * 执行全局装饰器
     * @param {Internal.Level} level
     * @param {SphereModel} sphere
     */
    runGlobalDecorators: function (level, sphere) {
        for (let i = 0; i < this.global.length; i++) {
            let decorator = this.global[i]
            if (decorator.predictor(level, sphere)) {
                decorator.action(level, sphere)
            }
        }
    }

}