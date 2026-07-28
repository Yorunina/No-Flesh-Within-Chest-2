// priority: 999

/**
 * 基础生态球属性构建
 * @returns 
 */
function SphereModel() {
    this.shellBlock = Block.getBlock('minecraft:stone').defaultBlockState()
    this.shellRadius = 10
    this.shellThickness = 1
    this.decorator = new SphereDecoratorPackerModel()
    this.center = new BlockPos(0, 0, 0)
}

SphereModel.prototype = {
    /**
     * 设置球壳
     * @param {string} block
     * @returns
     */
    setShellProperties: function (block, radius, thickness) {
        this.shellBlock = block
        this.shellRadius = radius
        this.shellThickness = thickness
        return this
    },
    /**
     * 添加装饰器
     * @param {SphereDecorator} decorator
     * @returns
     */
    addDecorator: function (decorator) {
        this.decorator.addDecorator(decorator)
        return this
    },
    /**
     * 生成生态球
     * @param {BlockPos} pos
     * @returns
     */
    generateSphere: function (pos) {
        return
    }
}