// priority: 2000
/**
 * 用于作为一个分段映射快速处理的模型
 * @returns {PiecewiseMappingModel} 分段映射模型
 */
function PiecewiseMappingModel() {
    /** @type {PiecewiseItemModel[]} */
    this.piecewiseMappingList = []
}


PiecewiseMappingModel.prototype = {
    /**
     * 添加一个分段映射
     * @param {number} start 分段映射的起始值
     * @param {number} end 分段映射的结束值
     * @param {any} value 分段映射的值
     */
    addPiece: function (start, end, value) {
        this.piecewiseMappingList.push(new PiecewiseItemModel(start, end, value))
        return this
    },
    /**
     * 获取一个值对应的所有分段映射的值
     * @param {number} value 要获取的值
     * @returns {PiecewiseItemModel[]} 分段映射的值
     */
    findItems: function (value) {
        let items = []
        for (let piece of this.piecewiseMappingList) {
            if (piece.isInRange(value)) {
                items.push(piece)
            }
        }
        return items
    },
    /**
     * 获取一个值对应的所有分段映射的值
     * @param {number} value 要获取的值
     * @returns {any} 分段映射的值
     */
    getFirstValue: function (value) {
        for (let piece of this.piecewiseMappingList) {
            if (piece.isInRange(value)) {
                return piece.getValue()
            }
        }
        return null
    },
    /**
     * 获取一个值对应的最近的分段映射的值
     * @param {number} value 要获取的值
     * @returns {any} 分段映射的值
     */
    getNearestValue: function (value) {
        let items = this.findItems(value)
        if (items.length == 0) return null
        let nearestItem = items[0]
        let nearestPercent = Math.abs(nearestItem.getPercent(value) - 0.5)
        for (let item of items) {
            let curPercent = Math.abs(item.getPercent(value) - 0.5)
            if (curPercent < nearestPercent) {
                nearestItem = item
                nearestPercent = curPercent
            }
        }
        return nearestItem.getValue()
    },
    /**
     * 获取一个值对应的所有分段映射的值
     * @param {number} value 要获取的值
     * @returns {any[]} 分段映射的值
     */
    getAllValues: function (value) {
        let items = this.findItems(value)
        if (items.length == 0) return []
        let values = []
        for (let item of items) {
            values.push(item.getValue())
        }
        return values
    },
}


/**
 * 用于作为一个分段映射的项，[start, end)
 * @param {number} start 分段映射的起始值
 * @param {number} end 分段映射的结束值
 * @param {any} value 分段映射的值
 */
function PiecewiseItemModel(start, end, value) {
    this.start = start
    this.end = end
    this.value = value
}

PiecewiseItemModel.prototype = {
    /**
     * 检查一个值是否在这个分段映射的范围内
     * @param {number} value 要检查的值
     * @returns {boolean} 是否在范围内
     */
    isInRange: function (value) {
        return value >= this.start && value < this.end
    },
    /**
     * 获取这个分段映射的值
     * @returns {any} 分段映射的值
     */
    getValue: function () {
        return this.value
    },
    /**
     * 获取这个分段映射的中间值
     * @returns {number} 分段映射的中间值
     */
    getMid: function () {
        return (this.end - this.start) / 2 + this.start
    },
    /**
     * 获取这个分段映射的范围大小
     * @returns {number} 分段映射的范围大小
     */
    getRange: function () {
        return this.end - this.start
    },
    /**
     * 获取这个分段映射的百分比位置
     * @param {number} value 要获取的百分比位置的值
     * @returns {number} 分段映射的百分比位置
     */
    getPercent: function (value) {
        return (this.end - this.start == 0) ? (value == this.start ? 1 : 0) : ((value - this.start) / (this.end - this.start))
    },
    /**
     * 获取这个分段映射的起始值
     * @returns {number} 分段映射的起始值
     */
    getStart: function () {
        return this.start
    },
    /**
     * 获取这个分段映射的结束值
     * @returns {number} 分段映射的结束值
     */
    getEnd: function () {
        return this.end
    },
}