// priority: 501
RegistryOrgan('kubejs:mammary_gland')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:knockback_resistant', -1)
    .setCanSpawn(true)
    
const MammaryGlandRecipeMap = new Map()
/**
 * 
 * @param {String} entityTypeId 
 * @param {ItemStack} oriItem 
 * @param {ItemStack} outputItem 
 * @param {number} damage 
 */
function registryMammaryGlandRecipe(entityTypeId, oriItem, outputItem, damage) {
    MammaryGlandRecipeMap.set(entityTypeId, {
        outputItem: outputItem,
        damage: damage,
        oriItem: oriItem
    })
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.ItemEntityInteractedEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function MammaryGlandEntityBeInteracted(customData, event, organItem, organIndex, slotType) {
    const item = event.item
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    const target = event.target
    const targetType = target.getType()
    if (item.isEmpty()) return
    if (targetType == 'minecraft:cow') return
    if (target.invulnerableTime > 0) target.invulnerableTime = 0
    let recipe = MammaryGlandRecipeMap.has(String(targetType)) ? MammaryGlandRecipeMap.get(String(targetType)) : MammaryGlandRecipeMap.get('default')

    if (!item.is(recipe['oriItem'])) return
    let bucketItem = recipe['outputItem']
    if (recipe['damage']) {
        target.attack(entity.damageSources().magic(), recipe['damage'])
    }

    if (!entity.isCreative()) item.shrink(1)

    entity.playSound('item.bucket.fill_milk')
    entity.give(bucketItem.withName(Text.translate('item_name.kubejs.mammary_gland_bucket.name', target.getName())))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mammary_gland')
        .addOnlyStrategy('entity_be_interacted', MammaryGlandEntityBeInteracted)
)

registryMammaryGlandRecipe('default', Item.of('minecraft:bucket'), Item.of('minecraft:milk_bucket'), 2)
registryMammaryGlandRecipe('minecraft:bee', Item.of('minecraft:glass_bottle'), Item.of('minecraft:honey_bottle'), 4)
registryMammaryGlandRecipe('minecraft:panda', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
registryMammaryGlandRecipe('minecraft:frog', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:leaping"}'), 4)
registryMammaryGlandRecipe('minecraft:bat', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:night_vision"}'), 4)
registryMammaryGlandRecipe('minecraft:glow_squid', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:night_vision"}'), 4)
registryMammaryGlandRecipe('minecraft:ghast', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:regeneration"}'), 6)
registryMammaryGlandRecipe('minecraft:axolotl', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:regeneration"}'), 6)
registryMammaryGlandRecipe('minecraft:shulker', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:slow_falling"}'), 4)
registryMammaryGlandRecipe('minecraft:polar_bear', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
registryMammaryGlandRecipe('minecraft:ravager', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
registryMammaryGlandRecipe('minecraft:zoglin', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
registryMammaryGlandRecipe('minecraft:strider', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:fire_resistance"}'), 4)
registryMammaryGlandRecipe('minecraft:dolphin', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:fox', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:horse', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:donkey', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:mule', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:llama', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:trader_llama', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:ocelot', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
registryMammaryGlandRecipe('minecraft:turtle', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:turtle_master"}'), 4)
registryMammaryGlandRecipe('minecraft:squid', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:water_breathing"}'), 4)
registryMammaryGlandRecipe('minecraft:pufferfish', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:water_breathing"}'), 4)
registryMammaryGlandRecipe('minecraft:zombified_piglin', Item.of('minecraft:bucket'), Item.of('kubejs:molten_gold_fluid_bucket'), 15)
registryMammaryGlandRecipe('minecraft:drowned', Item.of('minecraft:bucket'), Item.of('kubejs:molten_copper_fluid_bucket'), 15)
registryMammaryGlandRecipe('minecraft:iron_golem', Item.of('minecraft:bucket'), Item.of('kubejs:molten_iron_fluid_bucket'), 25)
registryMammaryGlandRecipe('minecraft:magma_cube', Item.of('minecraft:slime_ball'), Item.of('minecraft:magma_cream'), 1)
registryMammaryGlandRecipe('minecraft:villager', Item.of('minecraft:bucket'), Item.of('kubejs:molten_emerald_fluid_bucket'), 15)
registryMammaryGlandRecipe('minecraft:ender_dragon', Item.of('minecraft:glass_bottle'), Item.of('minecraft:dragon_breath'), 10)
registryMammaryGlandRecipe('dracolotl:dracolotl', Item.of('minecraft:glass_bottle'), Item.of('minecraft:dragon_breath'), 1)