// priority: 2000

/**
 * 基础生态球属性构建
 * @returns 
 */
function GeodeSphereModel() {
    SphereModel.call(this)
    this.shellBlock = Block.getBlock('minecraft:glass').defaultBlockState()
    this.shellRadius = 10
    this.shellThickness = 1
    this.decorator = new SphereDecoratorPackerModel()
    this.center = new BlockPos(0, 0, 0)
    /**@type {VeinProperty[]} */
    this.veinProperties = []
    this.fillBlock = Block.getBlock('minecraft:stone').defaultBlockState()
}

GeodeSphereModel.prototype = Object.create(SphereModel.prototype)
GeodeSphereModel.prototype.constructor = GeodeSphereModel

/**
 * 
 * @param {Internal.BlockState} veinBlock 
 * @param {number} veinSize 
 * @param {'cloud'|'dense'|'random'|'flake'} type 
 */
function VeinProperty(veinBlock, veinSize, type) {
    /**@type {Internal.BlockState} */
    this.block = veinBlock
    /**@type {number} */
    this.size = veinSize
    /**@type {'cloud'|'dense'|'random'|'flake'} */
    this.type = type
}
VeinProperty.prototype = {
    /**
     * @param {Internal.ServerLevel} level
     * @param {GeodeSphereModel} sphereModel
     * @param {BlockPos} pos
     * @param {number} distance
     * @returns {boolean}
     */
    placeVeinBlock: function (level, sphereModel, pos, distance) {
        switch (this.type) {
            case 'cloud':
                if (distance > this.size) {
                    return false
                }
                if (Math.random() > Math.pow(distance / this.size, 0.5)) {
                    level.setBlock(pos, this.block, 2)
                    return true
                }
                return false
            case 'dense':
                if (distance > this.size) {
                    return false
                }
                if (Math.random() > 0.3) {
                    level.setBlock(pos, this.block, 2)
                    return true
                }
                return false
            case 'random':
                if (distance > this.size) {
                    return false
                }
                if (Math.random() > 0.95) {
                    level.setBlock(pos, this.block, 2)
                    return true
                }
                return false
            default:
                return false
        }
    }
}

/**
 * 
 * @param {Internal.BlockState} veinBlock 
 * @param {number} veinSize 
 * @param {'cloud'|'dense'|'random'|'flake'} type 
 */
GeodeSphereModel.prototype.addVein = function (veinBlock, veinSize, type) {
    this.veinProperties.push(new VeinProperty(veinBlock, veinSize, type))
    return this
}


GeodeSphereModel.prototype.setFillBlock = function (fillBlock) {
    this.fillBlock = fillBlock
    return this
}



/**
 * 生成生态球
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos 中心位置
 * @returns
 */
GeodeSphereModel.prototype.generateSphere = function (level, pos) {
    this.center = pos
    this.decorator.runGlobalDecorators(level, this)
    /**@type {Object<string, Internal.ChunkAccess>} */
    for (let x = -this.shellRadius; x <= this.shellRadius; x++) {
        for (let z = -this.shellRadius; z <= this.shellRadius; z++) {
            for (let y = -this.shellRadius; y <= this.shellRadius; y++) {
                let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
                if (distance <= this.shellRadius && distance >= this.shellRadius - this.shellThickness) {
                    // 球壳填充
                    let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                    level.setBlock(curPos, this.shellBlock, 2)
                    this.decorator.runShellDecorators(level, this, new BlockPos(x, y, z))
                    continue
                }
                if (distance <= this.shellRadius - this.shellThickness) {
                    // 球壳内部
                    // 生成 vein
                    let isPlaced = false
                    for (let i = 0; i < this.veinProperties.length; i++) {
                        let veinProperty = this.veinProperties[i]
                        if (veinProperty.placeVeinBlock(level, this, new BlockPos(pos.x + x, pos.y + y, pos.z + z), distance)) {
                            isPlaced = true
                            break
                        }
                    }
                    if (!isPlaced) {
                        level.setBlock(new BlockPos(pos.x + x, pos.y + y, pos.z + z), this.fillBlock, 2)
                    }
                }
            }
        }
    }
    return
}