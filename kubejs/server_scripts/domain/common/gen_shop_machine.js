// priority: 500
// LightmansCustomGachaTraderModel
/**
 * @type {Map<String, WeightRandomModel>}
 */
const ShopItemTraderType2TradeData = new Map()
/**
 * @type {Map<String, WeightRandomModel>}
 */
const ShopGachaTraderType2TradeData = new Map()
BlockEvents.rightClicked(event => {
    const level = event.level
    const block = event.block
    const state = block.blockState
    if (!(state.block instanceof $TraderBlockBase)) return
    // 逻辑仅在商店维度生效
    if (level.dimension != 'infinity:room') return

    /**@type {Internal.TraderBlockEntity} */
    let coreBlockEntity = block.entity
    if (coreBlockEntity instanceof $CapabilityInterfaceBlockEntity) {
        coreBlockEntity = coreBlockEntity.tryGetCoreBlockEntity()
    }
    if (coreBlockEntity == null) return
    if (coreBlockEntity.isIgnoreCustomTrader()) return
    const persistentData = coreBlockEntity.persistentData
    if (persistentData.getBoolean('hadGen')) return
    const nbt = new $CompoundTag()
    // if (!persistentData.contains('genType')) return
    // let genType = String(persistentData.getString('genType'))
    let genType = 'minecraft_basic'
    if (coreBlockEntity instanceof $ItemTraderBlockEntity) {
        if (!ShopItemTraderType2TradeData.has(genType)) return
        let trades = ShopItemTraderType2TradeData.get(genType).getWeightRandomObjs(coreBlockEntity.getTradeCount())
        let customTrader = new LightmansCustomItemTraderModel().setTrades(trades)
        nbt.put('CustomTrader', customTrader.write())
    } else if (coreBlockEntity instanceof $GachaMachineBlockEntity) {
        genType = 'organ'
        if (!ShopGachaTraderType2TradeData.has(genType)) return
        let storages = ShopGachaTraderType2TradeData.get(genType).getWeightRandomRepeatedObjs(Math.floor(Math.random() * 40))
        let customTrader = new LightmansCustomGachaTraderModel().setStorage(storages)
        nbt.put('CustomTrader', customTrader.write())
    } else {
        return
    }
    const coreBlock = level.getBlock(coreBlockEntity.blockPos)
    coreBlock.mergeEntityData(nbt)
    coreBlockEntity.serverTick()
    coreBlockEntity.persistentData.putBoolean('hadGen', true)
})

/**
 * 
 * @param {String} type 
 * @param {WeightRandomModel} data 
 */
function RegistryShopGachaTraderType(type, data) {
    ShopGachaTraderType2TradeData.set(type, data)
}
RegistryShopGachaTraderType('organ',
    new WeightRandomModel()
        .addWeightRandom(Item.of('minecraft:totem_of_undying'), 5)
        .addWeightRandom(Item.of('minecraft:iron_ingot'), 100)
        .addWeightRandom(Item.of('minecraft:copper_ingot'), 100)
)


/**
 * 
 * @param {String} type 
 * @param {WeightRandomModel} data 
 */
function RegistryShopItemTraderType(type, data) {
    ShopItemTraderType2TradeData.set(type, data)
}


RegistryShopItemTraderType('minecraft_basic',
    new WeightRandomModel()
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:totem_of_undying')], 200), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:dried_ghast')], 100).setTradeLimitRule(1), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:turtle_egg')], 200), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:sniffer_egg')], 600), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:budding_amethyst')], 300), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:crying_obsidian', 3)], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('dracolotl:bucket_of_dracolotl')], 1000).setTradeLimitRule(1), 10)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:spawner')], 1000).setTradeLimitRule(1), 20)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('cornucopia:cornucopia')], 300), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:end_portal_frame', 13)], 1000).setTradeLimitRule(1), 5)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:ghast_tear')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:netherite_upgrade_smithing_template')], 800), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:echo_shard')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:leather')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:shulker_shell')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:slime_ball')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:nether_star')], 300), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:enchanted_golden_apple')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:confetti_popper', 64)], 1), 20)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:ender_pearl')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:prismarine_shard')], 5), 20)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:prismarine_crystals')], 5), 20)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:nether_wart')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:dragon_breath')], 10), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:blaze_rod')], 10), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:heart_of_the_sea')], 300), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:rabbit_foot')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:honeycomb')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:armadillo_scute')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:honey_bottle')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:name_tag')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:axolotl_bucket')], 100), 50)
)

RegistryShopItemTraderType('ore',
    new WeightRandomModel()
        .addWeightRandom(CreateSimpleTradeModel([Item.of('tetra:geode')], 100), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:clay')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:lapis_lazuli')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:amethyst_shard')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:quartz')], 5), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:coal')], 3), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:raw_gold')], 10), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:raw_copper')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:raw_iron')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:emerald')], 5), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:diamond')], 50), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:netherite_scrap')], 100), 20)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:redstone')], 3), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:glowstone_dust')], 3), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('minecraft:andesite')], 5), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:raw_zinc')], 10), 100)
)

RegistryShopItemTraderType('toy',
    new WeightRandomModel()
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:lunch_basket')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('candlelight:love_letter', '{author:"未名人",letter_sender:"未名人",letter_title:"你",text:["每次看你砍树、挖矿、建起小屋，我的心就跟着你的脚步跳动。不敢靠太近，怕打扰你的冒险。但请知道——这个世界里，最珍贵的不是钻石，而是你。愿陪你走过每一座山、每一条河。永远爱你♥️♥️♥️。"],title:"♥️"}')], 300).setTradeLimitRule(1), 10)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:bubble_blower')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:slingshot')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:flute')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:tiny_drum')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:didgeridoo')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:lute')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:piano')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:triangle')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:vielle')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:flute')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('immersive_melodies:trumpet')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('supplementaries:speaker_block')], 10), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('ropebridge:bridge_builder')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('ropebridge:ladder_builder')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('exposure_polaroid:instant_color_slide')], 200), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('exposure_polaroid:instant_camera')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('elevatorid:elevator_white')], 20), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('refurbished_furniture:yellow_toilet')], 50), 100)
)

RegistryShopItemTraderType('create_parts',
    new WeightRandomModel()
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create_connected:fan_blasting_catalyst')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create_connected:fan_haunting_catalyst')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create_connected:fan_splashing_catalyst')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create_connected:fan_smoking_catalyst')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_mixer')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_press')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:deployer')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_saw')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_drill')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:extendo_grip')], 300), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:packager')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:potato_cannon')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:blaze_cake')], 50), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:rotation_speed_controller')], 150), 50)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:blaze_burner')], 100), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_roller')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_harvester')], 50), 100)
        .addWeightRandom(CreateSimpleTradeModel([Item.of('create:mechanical_plough')], 50), 100)
)