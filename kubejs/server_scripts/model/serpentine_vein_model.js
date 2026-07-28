// priority: 2000
/**
 * @returns {SerpentineVeinModel}
 */
function SerpentineVeinModel() {
    /**@type {number}*/
    this.oreCount = 32
    /**@type {Internal.BlockState}*/
    this.fillBlock = Block.getBlock('minecraft:air').defaultBlockState()
    /**@type {VeinEntryModel[]}*/
    this.veinEntries = []
    /**@type {number} 矿带"长轴"方向噪声跨越的格数，越大矿带越弯曲/破碎。*/
    this.horizontalCells = 1
    /**@type {number} 竖直方向噪声跨越的格数，越大矿带越薄、层数越多。*/
    this.verticalCells = 1.5
    return this
}

SerpentineVeinModel.prototype = {
    /**
     * @param {number} count
     * @returns {SerpentineVeinModel}
     */
    setOreCount: function (count) {
        this.oreCount = count
        return this
    },
    /**
     * @param {Internal.BlockState} block
     * @returns {SerpentineVeinModel}
     */
    setFillBlock: function (block) {
        this.fillBlock = block
        return this
    },
    /**
     * 设置矿带长轴方向噪声格数（控制矿带弯曲程度）。
     * @param {number} cells
     * @returns {SerpentineVeinModel}
     */
    setHorizontalCells: function (cells) {
        this.horizontalCells = cells
        return this
    },
    /**
     * 设置竖直方向噪声格数（控制矿带厚度与层数）。
     * @param {number} cells
     * @returns {SerpentineVeinModel}
     */
    setVerticalCells: function (cells) {
        this.verticalCells = cells
        return this
    },
    /**
     * @param {Internal.BlockState} block
     * @param {number} weight
     * @returns {SerpentineVeinModel}
     */
    addVein: function (block, weight) {
        this.veinEntries.push(new VeinEntryModel(block, weight))
        return this
    },
    /**
     * @returns {Internal.BlockState}
     */
    pickVeinBlock: function () {
        let totalWeight = 0
        for (let i = 0; i < this.veinEntries.length; i++) {
            totalWeight += this.veinEntries[i].weight
        }
        if (totalWeight <= 0) return this.fillBlock
        let roll = Math.random() * totalWeight
        let current = 0
        for (let i = 0; i < this.veinEntries.length; i++) {
            current += this.veinEntries[i].weight
            if (roll < current) return this.veinEntries[i].block
        }
        return this.veinEntries[this.veinEntries.length - 1].block
    },
    /**
     * @param {Internal.ServerLevel} level
     * @param {Internal.AABB} bounds
     * @returns {SerpentineVeinModel}
     */
    generate: function (level, bounds) {
        const minX = Math.floor(bounds.minX)
        const minY = Math.floor(bounds.minY) + 1
        const minZ = Math.floor(bounds.minZ)
        const maxX = Math.ceil(bounds.maxX) - 1
        const maxY = Math.ceil(bounds.maxY)
        const maxZ = Math.ceil(bounds.maxZ) - 1
        if (maxX < minX || maxY < minY || maxZ < minZ) return this

        const xSize = maxX - minX + 1
        const ySize = maxY - minY + 1
        const zSize = maxZ - minZ + 1
        const total = xSize * ySize * zSize
        if (total <= 0) return this

        const targetOre = Math.max(0, Math.min(this.oreCount, total))

        const elongateX = Math.random() < 0.5
        const longCells = this.horizontalCells
        const shortCells = this.horizontalCells * 2.0
        const fx = (elongateX ? longCells : shortCells) / xSize
        const fz = (elongateX ? shortCells : longCells) / zSize
        const fy = this.verticalCells / ySize


        const seed = (((minX * 341873128712) ^ (minZ * 132897987541) ^ (minY * 92837111)) >>> 0) ^ (Math.floor(Math.random() * 0xFFFFFFFF) >>> 0)

        const rs = $RandomSource.create(seed >>> 0)
        const noise = new $ImprovedNoise(rs)

        const noiseField = []
        let idx = 0
        for (let y = minY; y <= maxY; y++) {
            let ny = y * fy
            for (let z = minZ; z <= maxZ; z++) {
                let nz = z * fz
                for (let x = minX; x <= maxX; x++) {
                    noiseField[idx++] = Math.abs(noise.noise(x * fx, ny, nz))
                }
            }
        }

        let threshold = Infinity
        if (targetOre > 0) {
            let sorted = noiseField.slice().sort((a, b) => a - b)
            threshold = sorted[targetOre - 1]
        }

        const mutablePos = BlockPos.ZERO.mutable()
        idx = 0
        let orePlaced = 0
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                for (let x = minX; x <= maxX; x++) {
                    mutablePos.set(x, y, z)
                    let block
                    if (orePlaced < targetOre && noiseField[idx] <= threshold) {
                        block = this.pickVeinBlock()
                        orePlaced++
                    } else {
                        block = this.fillBlock
                    }
                    level.setBlock(mutablePos, block, 2)
                    idx++
                }
            }
        }
        return this
    }
}

/**
 * 矿脉方块条目
 * @param {Internal.BlockState} block
 * @param {number} weight
 * @returns {VeinEntryModel}
 */
function VeinEntryModel(block, weight) {
    /**@type {Internal.BlockState}*/
    this.block = block
    /**@type {number}*/
    this.weight = weight
    return this
}
