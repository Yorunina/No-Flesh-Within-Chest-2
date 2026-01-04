// priority: 501
const BabyEntityNbt = new $CompoundTag()
BabyEntityNbt.putByte('IsBaby', 1)
/**
 * typeIndicator -> levelIndicator -> WaveEntityItemModel
 * green -> yellow -> red -> pink -> purple -> aqua
 */
const GatewayWaveEntityMapping = new PiecewiseMappingModel()
    .addPiece(0, 60,
        new PiecewiseMappingModel()
            .addPiece(0, 10, new WaveEntityItemModel(100, 'minecraft:zombie')
                .addModifier((levelIndicator, chaosIndicator) => {
                    return [
                        GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                        GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                        GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator / 2),
                        GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator / 5)
                    ]
                })
            )
            .addPiece(3, 7, new WaveEntityItemModel(100, 'minecraft:zombie')
                .addModifier((levelIndicator, chaosIndicator) => {
                    return [
                        GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                    ]
                })
                .setCompoundTag(BabyEntityNbt)
            )
    )


/**
 * 
 * @param {number} price 
 * @param {Internal.EntityType_<any>} entityType 
 * @param {number} count 
 */
function WaveEntityItemModel(price, entityType) {
    this.price = price
    this.entityType = entityType
    this.compoundTag = new $CompoundTag()
    this.modifier = (levelIndicator, chaosIndicator) => { return [] }
    this.time = 60
}

WaveEntityItemModel.prototype = {
    /**
     * 添加一个实体属性修改器
     * @param {function(number, number):Internal.List_<GatewayWaveModifier>} modifier 实体属性修改器
     */
    addModifier: function (modifier) {
        this.modifiers.push(modifier)
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
}