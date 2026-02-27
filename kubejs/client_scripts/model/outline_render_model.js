// priority: 2000
/**
 * @param {BlockPos} blockPos 
 * @param {number} color 
 */
function OutlineRenderModel(blockPos, color) {
    this.x = blockPos.getX()
    this.y = blockPos.getY()
    this.z = blockPos.getZ()
    /** @type {number} */
    this.color = color
    this.time = -1
}
OutlineRenderModel.prototype = {
    /**
     * @param {OutlineRenderModel} other 
     * @returns {boolean}
     */
    equals: function (other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.color === other.color
    },
    /**
     * @returns {BlockPos}
     */
    getBlockPos() {
        return new BlockPos(this.x, this.y, this.z)
    },
    /**
     * @param {number} time 
     */
    setTime(time) {
        this.time = time
        return this
    },
    setColor(color) {
        this.color = color
    }
}

function ConvertNbt2OutlineRenderList(nbtList) {
    let outlineList = []
    nbtList.forEach(/** @param {Internal.CompoundTag} nbt */nbt => {
        if (!nbt || !nbt.contains('x') || !nbt.contains('y') || !nbt.contains('z')) return null
        let pos = new BlockPos(nbt.getInt('x'), nbt.getInt('y'), nbt.getInt('z'))
        let color = nbt.contains('color') ? nbt.getInt('color') : 0x000000
        let res = new OutlineRenderModel(pos, color)
        if (nbt.contains('time')) {
            let time = nbt.getInt('time')
            res.setTime(time)
        }
        outlineList.push(res)
    })
    return outlineList
}


/**
 * @param {OutlineRenderModel[]} outlineList 
 * @returns {Internal.ListTag}
 */
function ConvertOutlineRenderList2Nbt(outlineList) {
    let res = new $ListTag()
    outlineList.forEach(/** @param {OutlineRenderModel} outline */outline => {
        let nbt = new $CompoundTag()
        nbt.putInt('x', outline.x)
        nbt.putInt('y', outline.y)
        nbt.putInt('z', outline.z)
        nbt.putInt('color', outline.color)
        if (outline.time > 0) {
            nbt.putInt('time', outline.time)
        }
        res.add(nbt)
    })
    return res
}