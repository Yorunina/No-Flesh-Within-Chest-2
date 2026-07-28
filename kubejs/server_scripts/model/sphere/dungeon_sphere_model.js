// priority: 900

/**
 * 核心+球壳生态球属性构建
 * @returns 
 */
function DungeonSphereModel() {
    SphereModel.call(this)
    this.shellBlock = Block.getBlock('minecraft:dirt').defaultBlockState()
    this.shellRadius = 10
    this.shellThickness = 1
    this.decorator = new SphereDecoratorPackerModel()
    this.center = new BlockPos(0, 0, 0)

    this.dungeonFloorBlock = Block.getBlock('minecraft:stone').defaultBlockState()
    this.dungeonHeightRadius = 3

    this.spawnerShellBlock = Block.getBlock('minecraft:glass').defaultBlockState()
    this.spawnerShellRadius = 1

    this.spawnEggItem = Item.of('minecraft:rabbit_spawn_egg')
    this.spawnLootTable = 'trials:gameplay/spawner_loot_1'
    this.spawnerDifficulty = 50
}

DungeonSphereModel.prototype = Object.create(SphereModel.prototype)
DungeonSphereModel.prototype.constructor = DungeonSphereModel

/**
 * 设置地牢属性
 * @param {Internal.BlockState} block
 * @param {Internal.BlockState} spawnerShell
 * @param {number} radius
 * @returns
 */
DungeonSphereModel.prototype.setDungeonProperties = function (floorBlock, spawnerShell, radius, spawnerShellRaduis) {
    this.dungeonFloorBlock = floorBlock
    this.dungeonHeightRadius = radius
    this.spawnerShellBlock = spawnerShell
    this.spawnerShellRadius = spawnerShellRaduis
    return this
}

/**
 * 设置试炼刷怪笼属性
 * @param {string} block
 * @returns
 */
DungeonSphereModel.prototype.setSpawnerProperties = function (spawnEggItem, spawnLootTable, spawnerDifficulty) {
    this.spawnEggItem = spawnEggItem
    this.spawnLootTable = spawnLootTable
    this.spawnerDifficulty = spawnerDifficulty
    return this
}



/**
 * 生成生态球
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} pos 中心位置
 * @returns
 */
DungeonSphereModel.prototype.generateSphere = function (level, pos) {
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

                    // 生成上下地板填充
                    if (y <= -this.dungeonHeightRadius || y >= this.dungeonHeightRadius) {
                        let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                        level.setBlock(curPos, this.dungeonFloorBlock, 2)
                        continue
                    } else if (x == 0 && y == 0 && z == 0) {
                        // 原点生成刷怪笼
                        let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                        /**@type {Internal.TrialSpawnerBlock} */
                        let spawnerBlock = Block.getBlock('trials:trial_spawner')
                        let spawnBlockState = spawnerBlock.defaultBlockState()
                        level.setBlock(curPos, spawnBlockState, 2)
                        let spawnerEntity = level.getBlockEntity(pos)
                        spawnerEntity.setDifficulty(this.spawnerDifficulty)
                        spawnerEntity.setEgg(this.spawnEggItem)
                        spawnerEntity.setSpawnLootTable(this.spawnLootTable)

                    } else if (distance <= this.spawnerShellRadius) {
                        // 刷怪笼外壳（核心外壳）
                        let curPos = new BlockPos(pos.x + x, pos.y + y, pos.z + z)
                        level.setBlock(curPos, this.spawnerShellBlock, 2)
                        continue
                    } else {
                        // 地牢内部空闲区域视为球壳内部
                        this.decorator.runInnerDecorators(level, this, new BlockPos(x, y, z))
                        continue
                    }
                }
            }
        }
    }
    return
}