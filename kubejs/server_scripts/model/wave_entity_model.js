// priority: 2000
/**
 * 
 * @param {number} price 
 * @param {Internal.EntityType_<any>} entityType 
 * @param {number} count 
 */
function StandardWaveEntityItemModel(price, entityType) {
    this.price = price
    this.entityType = entityType
    this.compoundTag = null
    this.modifier = (levelIndicator, chaosIndicator) => { return [] }
    this.time = price * 2
}

StandardWaveEntityItemModel.prototype = {
    /**
     * 添加一个实体属性修改器
     * @param {function(number, number):Internal.List_<GatewayWaveModifier>} modifier 实体属性修改器
     */
    setModifier: function (modifier) {
        this.modifier = modifier
        return this
    },
    /**
     * 设置实体的NBT标签
     * @param {Internal.CompoundTag} compoundTag 实体的NBT标签
     */
    setCompoundTag: function (compoundTag) {
        this.compoundTag = compoundTag
        return this
    },
    /**
     * 设置对应的占用时间
     * @param {number} num 实体的NBT标签
     */
    setTime: function (num) {
        this.time = num
        return this
    },
    /**
     * 创建一个实体
     * @param {number} levelIndicator
     * @param {number} chaosIndicator
     * @param {number} count 实体数量
     */
    create(levelIndicator, chaosIndicator, count) {
        return GatewayUtils.buildStandardWaveEntity(
            this.entityType,
            '',
            this.compoundTag,
            this.modifier(levelIndicator, chaosIndicator),
            true,
            count
        )
    }
}



/**
 * 
 * @param {number} price 
 * @param {function(Internal.Level):Internal.Entity} genFunc 
 * @param {number} count 
 */
function FunctionWaveEntityItemModel(price, genFunc) {
    this.price = price
    this.genFunc = genFunc
    this.modifier = (levelIndicator, chaosIndicator) => { return [] }
    this.time = price * 2
}

FunctionWaveEntityItemModel.prototype = {
    /**
     * 添加一个实体属性修改器
     * @param {function(number, number):Internal.List_<GatewayWaveModifier>} modifier 实体属性修改器
     */
    setModifier: function (modifier) {
        this.modifier = modifier
        return this
    },
    /**
     * 设置对应的占用时间
     * @param {number} num 实体的NBT标签
     */
    setTime: function (num) {
        this.time = num
        return this
    },
    /**
     * 创建一个实体
     * @param {number} levelIndicator
     * @param {number} chaosIndicator
     * @param {number} count 实体数量
     */
    create(levelIndicator, chaosIndicator, count) {
        return new GatewayFunctionWaveEntity(
            this.genFunc,
            this.modifier(levelIndicator, chaosIndicator),
            false,
            count
        )
    }
}