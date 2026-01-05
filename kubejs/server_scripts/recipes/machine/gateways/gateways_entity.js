// priority: 501
function EntityBabyNbt() {
    let nbt = new $CompoundTag()
    nbt.putByte('IsBaby', 1)
    return nbt
}

function EntitySizeNbt(size) {
    let nbt = new $CompoundTag()
    nbt.putInt('Size', size)
    return nbt
}
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
}

/**
 * typeIndicator -> levelIndicator -> WaveEntityItemModel
 * green -> yellow -> red -> pink -> purple -> aqua
 */
const GatewayWaveEntityMapping = new PiecewiseMappingModel()
    .addPiece(0, 60, new PiecewiseMappingModel()
        .addPiece(0, 10, new WaveEntityItemModel(50, 'minecraft:zombie')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator / 2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator / 5)
                ]
            })
        )
        .addPiece(3, 7, new WaveEntityItemModel(200, 'minecraft:zombie')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                ]
            })
            .setCompoundTag(EntityBabyNbt())
        )
        .addPiece(4, 6, new WaveEntityItemModel(500, 'minecraft:giant')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 50 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(8, 10, new WaveEntityItemModel(1000, 'minecraft:warden')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 50 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(6, 10, new WaveEntityItemModel(200, 'minecraft:creeper')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.movement_speed', 'multiply_total', 1 + levelIndicator / 100 + chaosIndicator / 10)
                ]
            })
            .setCompoundTag(EntityBabyNbt())
        )
        .addPiece(0, 10, new WaveEntityItemModel(20, 'minecraft:slime')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                ]
            })
            .setCompoundTag(EntitySizeNbt(1))
        )
        .addPiece(3, 7, new WaveEntityItemModel(200, 'minecraft:slime')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.5),
                ]
            })
            .setCompoundTag(EntitySizeNbt(4))
        )
        .addPiece(0, 10, new WaveEntityItemModel(80, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                ]
            })
        )
        .addPiece(3, 7, new WaveEntityItemModel(100, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                    GatewayUtils.buildEffectModifier(1, 'minecraft:regeneration', 0, false, false)
                ]
            })
        )
        .addPiece(4, 6, new WaveEntityItemModel(200, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildEffectModifier(1, 'minecraft:invisibility', 0, true, true)
                ]
            })
        )
        .addPiece(0, 10, new WaveEntityItemModel(80, 'minecraft:skeleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(0, 10, new WaveEntityItemModel(80, 'minecraft:skeleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(10, 20, new WaveEntityItemModel(50, 'minecraft:pillager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator / 2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator / 2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator / 5)
                ]
            })
        )
        .addPiece(12, 18, new WaveEntityItemModel(200, 'minecraft:vindicator')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(13, 17, new WaveEntityItemModel(200, 'minecraft:ravager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', 1 + levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 2)
                ]
            })
        )
        .addPiece(13, 17, new WaveEntityItemModel(500, 'minecraft:ravager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 5),
                    GatewayUtils.buildEffectModifier(1, 'irons_spellbooks:evasion', 1, false, false)
                ]
            })
        )
    )
