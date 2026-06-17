// priority: 501
function EntitySizeNbt(size) {
    let nbt = new $CompoundTag()
    nbt.putInt('Size', size)
    return nbt
}

/**
 * typeIndicator -> levelIndicator -> StandardWaveEntityItemModel
 * green -> yellow -> red -> pink -> purple -> aqua
 * green -> 原版常见 + 沼泽 0
 * yellow -> 原版掠夺者 + 沙漠 10
 * red -> 下界 20
 * pink -> 掠夺 + 变种 30
 * purple -> 不死生物 40
 * aqua -> 寒冷变种 50
 */
const GatewayWaveEntityMapping = new PiecewiseMappingModel()
    .addPiece(0, 61, new PiecewiseMappingModel()
        .addPiece(0, 10, new StandardWaveEntityItemModel(50, 'minecraft:zombie')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(3, 7, new StandardWaveEntityItemModel(200, 'minecraft:zombie')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5)
                ]
            })
            .setCompoundTag(GatewayNBTEntityBaby)
        )
        .addPiece(4, 6, new StandardWaveEntityItemModel(500, 'minecraft:giant')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 50 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(1, 9, new StandardWaveEntityItemModel(50, 'minecraft:slime')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                ]
            })
            .setCompoundTag(EntitySizeNbt(2))
        )
        .addPiece(3, 7, new StandardWaveEntityItemModel(200, 'minecraft:slime')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                ]
            })
            .setCompoundTag(EntitySizeNbt(4))
        )
        .addPiece(0, 10, new StandardWaveEntityItemModel(80, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                ]
            })
        )
        .addPiece(3, 7, new StandardWaveEntityItemModel(100, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildEffectModifier(1, 'minecraft:regeneration', 0, false, false)
                ]
            })
        )
        .addPiece(0, 10, new StandardWaveEntityItemModel(80, 'minecraft:skeleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(10, 20, new StandardWaveEntityItemModel(50, 'minecraft:husk')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.1)
                ]
            })
        )
        .addPiece(10, 20, new StandardWaveEntityItemModel(50, 'minecraft:pillager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(12, 18, new StandardWaveEntityItemModel(200, 'minecraft:vindicator')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(13, 17, new StandardWaveEntityItemModel(200, 'minecraft:ravager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(13, 17, new StandardWaveEntityItemModel(500, 'minecraft:ravager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 5),
                    GatewayUtils.buildEffectModifier(1, 'irons_spellbooks:evasion', 1, false, false)
                ]
            })
        )
        .addPiece(14, 20, new StandardWaveEntityItemModel(200, 'cataclysm:koboleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(14, 20, new StandardWaveEntityItemModel(300, 'cataclysm:wadjet')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(16, 20, new StandardWaveEntityItemModel(500, 'cataclysm:kobolediator')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator)
                ]
            })
            .setCompoundTag(GatewayNBTEntityAwaken)
        )
        .addPiece(22, 28, new StandardWaveEntityItemModel(100, 'minecraft:blaze')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                ]
            })
        )
        .addPiece(20, 30, new StandardWaveEntityItemModel(100, 'minecraft:wither_skeleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(20, 30, new StandardWaveEntityItemModel(80, 'minecraft:skeleton')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(20, 30, new StandardWaveEntityItemModel(20, 'minecraft:magma_cube')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                ]
            })
            .setCompoundTag(EntitySizeNbt(1))
        )
        .addPiece(23, 27, new StandardWaveEntityItemModel(200, 'minecraft:magma_cube')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                ]
            })
            .setCompoundTag(EntitySizeNbt(4))
        )
        .addPiece(23, 27, new StandardWaveEntityItemModel(150, 'cataclysm:ignited_berserker')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                ]
            })
        )
        .addPiece(23, 27, new StandardWaveEntityItemModel(200, 'cataclysm:ignited_revenant')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                ]
            })
        )
        .addPiece(30, 40, new StandardWaveEntityItemModel(50, 'minecraft:pillager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(30, 40, new StandardWaveEntityItemModel(200, 'minecraft:vindicator')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor_toughness', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(30, 40, new StandardWaveEntityItemModel(150, 'minecraft:ravager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(33, 37, new StandardWaveEntityItemModel(150, 'minecraft:illusioner')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(33, 37, new StandardWaveEntityItemModel(50, 'illagerinvasion:alchemist')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 2 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(33, 37, new StandardWaveEntityItemModel(200, 'illagerinvasion:inquisitor')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(33, 37, new StandardWaveEntityItemModel(200, 'illagerinvasion:marauder')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                    GatewayUtils.buildAttributeModifier('attributeslib:arrow_damage', 'addition', levelIndicator * 2)
                ]
            })
        )
        .addPiece(33, 37, new StandardWaveEntityItemModel(100, 'illagerinvasion:sorcerer')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.05),
                ]
            })
        )
        .addPiece(30, 40, new StandardWaveEntityItemModel(80, 'minecraft:witch')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                ]
            })
        )
        .addPiece(40, 50, new StandardWaveEntityItemModel(200, 'graveyard:skeleton_creeper')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.movement_speed', 'multiply_total', levelIndicator * 0.05)
                ]
            })
        )
        .addPiece(40, 50, new StandardWaveEntityItemModel(25, 'graveyard:ghoul')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total',levelIndicator * 0.5),
                ]
            })
        )
        .addPiece(40, 50, new StandardWaveEntityItemModel(25, 'graveyard:revenant')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.5),
                ]
            })
        )
        .addPiece(40, 50, new StandardWaveEntityItemModel(80, 'graveyard:nightmare')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('generic.armor', 'addition', levelIndicator * 2),
                ]
            })
        )
        .addPiece(43, 47, new StandardWaveEntityItemModel(50, 'graveyard:acolyte')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(43, 47, new StandardWaveEntityItemModel(100, 'graveyard:corrupted_vindicator')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(43, 47, new StandardWaveEntityItemModel(50, 'graveyard:corrupted_pillager')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5)
                ]
            })
        )
        .addPiece(42, 48, new StandardWaveEntityItemModel(100, 'graveyard:wraith')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.2)
                ]
            })
        )
        .addPiece(42, 48, new StandardWaveEntityItemModel(200, 'graveyard:reaper')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator)
                ]
            })
        )
        .addPiece(50, 61, new StandardWaveEntityItemModel(30, 'minecraft:drowned')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.1)
                ]
            })
        )
        .addPiece(50, 61, new StandardWaveEntityItemModel(150, 'cataclysm:coral_golem')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator)
                ]
            })
        )
        .addPiece(50, 61, new StandardWaveEntityItemModel(50, 'cataclysm:deepling')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 10 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ]
            })
        )
        .addPiece(50, 61, new StandardWaveEntityItemModel(80, 'cataclysm:deepling_priest')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.25),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ]
            })
        )
        .addPiece(52, 58, new StandardWaveEntityItemModel(100, 'cataclysm:deepling_warlock')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ]
            })
        )
        .addPiece(52, 58, new StandardWaveEntityItemModel(200, 'cataclysm:coralssus')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.2),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 20 * levelIndicator),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ]
            })
        )
        .addPiece(52, 58, new StandardWaveEntityItemModel(50, 'cataclysm:deepling_brute')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 5 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.attack_damage', 'addition', levelIndicator * 0.5),
                    new GatewayFunctionModifier((pEntity) => pEntity.setMoistness(6000))
                ]
            })
        )
        .addPiece(9, 10, new StandardWaveEntityItemModel(1000, 'minecraft:warden')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 100 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(24, 25, new StandardWaveEntityItemModel(1000, 'cataclysm:ignis')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 100 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
        .addPiece(42, 43, new StandardWaveEntityItemModel(1000, 'cataclysm:the_harbinger')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 100 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
            .setCompoundTag(GatewayNBTHarbingerActive)
        )
        .addPiece(51, 52, new StandardWaveEntityItemModel(1000, 'cataclysm:maledictus')
            .setModifier((levelIndicator, chaosIndicator) => {
                return [
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'addition', 100 * levelIndicator),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.max_health', 'multiply_total', levelIndicator * 0.1),
                    GatewayUtils.buildAttributeModifier('minecraft:generic.armor', 'addition', levelIndicator),
                ]
            })
        )
    )

