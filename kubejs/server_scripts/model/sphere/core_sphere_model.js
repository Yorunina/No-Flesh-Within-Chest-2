// priority: 900

/**
 * 核心+球壳生态球属性构建
 * @returns 
 */
function CoreSphereModel() {
    SphereModel.call(this)
    this.coreBlock = Block.getBlock('minecraft:coal_block').defaultBlockState()
    this.coreRadius = 2
    this.shellBlock = Block.getBlock('minecraft:stone').defaultBlockState()
    this.shellRadius = 10
    this.shellThickness = 1
    this.decorator = new SphereDecoratorPackerModel()
    this.center = new BlockPos(0, 0, 0)
}

CoreSphereModel.prototype = Object.create(SphereModel.prototype)
CoreSphereModel.prototype.constructor = CoreSphereModel


/**
 * 设置核心
 * @param {string} block
 * @returns
 */
CoreSphereModel.prototype.setCoreProperties = function (block, radius) {
    this.coreBlock = block
    this.coreRadius = radius
    return this
}

/**
 * 生成生态球
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos 中心位置
 * @returns
 */
CoreSphereModel.prototype.generateSphere = function (level, pos) {
    this.center = pos
    this.decorator.runGlobalDecorators(level, this)
    /**@type {Object<string, Internal.ChunkAccess>} */
    for (let x = -this.shellRadius; x <= this.shellRadius; x++) {
        for (let z = -this.shellRadius; z <= this.shellRadius; z++) {
            for (let y = -this.shellRadius; y <= this.shellRadius; y++) {
                let distance = Math.sqrt(x * x + y * y + z * z)
                if (distance <= this.shellRadius && distance >= this.shellRadius - this.shellThickness) {
                    // 球壳填充
                    let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                    level.setBlock(curPos, this.shellBlock, 2)
                    this.decorator.runShellDecorators(level, this, new BlockPos(x, y, z))
                    continue
                }
                if (distance <= this.coreRadius) {
                    // 核心区域填充
                    let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                    level.setBlock(curPos, this.coreBlock, 2)
                    continue
                }
                if (distance <= this.shellRadius - this.shellThickness) {
                    // 球壳内部空闲空间
                    this.decorator.runInnerDecorators(level, this, new BlockPos(x, y, z))
                    continue
                }
            }
        }
    }
    return
}