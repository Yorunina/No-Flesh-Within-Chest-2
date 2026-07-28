// priority: 900

/**
 * 基础生态球属性构建
 * @returns 
 */
function FluidSphereModel() {
    SphereModel.call(this)
    this.shellBlock = Block.getBlock('minecraft:glass').defaultBlockState()
    this.shellRadius = 10
    this.shellThickness = 1
    this.decorator = new SphereDecoratorPackerModel()
    this.fluidBlock = Block.getBlock('minecraft:water').defaultBlockState()
    this.fluidHeight = this.shellRadius
    this.center = new BlockPos(0, 0, 0)
}

FluidSphereModel.prototype = Object.create(SphereModel.prototype)
FluidSphereModel.prototype.constructor = FluidSphereModel

FluidSphereModel.prototype.setFluidProperties = function (fluidBlock, fluidHeight) {
    this.fluidBlock = fluidBlock
    this.fluidHeight = fluidHeight
    return this
}


/**
 * 生成生态球
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos 中心位置
 * @returns
 */
FluidSphereModel.prototype.generateSphere = function (level, pos) {
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
                if (distance <= this.shellRadius - this.shellThickness) {
                    // 球壳内部
                    if (y <= this.fluidHeight - this.shellRadius) {
                        // 内部液体
                        let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                        level.setBlock(curPos, this.fluidBlock, 2)
                        continue
                    }
                    this.decorator.runInnerDecorators(level, this, new BlockPos(x, y, z))
                }
            }
        }
    }
    return
}