// priority: 501
RegistryOrgan('kubejs:mammary_gland')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:knockback_resistant', -1)

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