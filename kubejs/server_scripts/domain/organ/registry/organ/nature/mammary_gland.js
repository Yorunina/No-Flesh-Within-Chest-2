// priority: 500
RegistryOrgan('kubejs:mammary_gland')
    .addScore('chestcavity:breath_capacity', 1)
    .addScore('chestcavity:knockback_resistant', -1)



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
    if ( targetType== 'minecraft:cow') return
    if (item.isEmpty() || item.id != 'minecraft:bucket') return
    let bucketItem = Item.of('minecraft:milk_bucket')
    let recipe = MammaryGlandRecipes[targetType]
    if (recipe) {
        bucketItem = recipe['item']
        if (recipe['damage']) {
            target.attack(recipe['damage'])
        }
    }
    if (!entity.isCreative()) {
        item.shrink(1)
    }
    entity.playSound('item.bucket.fill_milk')
    entity.give(bucketItem.withName(Text.translate('item_name.kubejs.mammary_gland_bucket.name', target.getName())))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mammary_gland')
        .addOnlyStrategy('entity_be_interacted', MammaryGlandEntityBeInteracted)
)

const MammaryGlandRecipes = {
    'minecraft:slime': {
        'item': Item.of('tconstruct:earth_slime_bucket'),
        'damage': 2,
    },
   'tconstruct:sky_slime': {
        'item': Item.of('tconstruct:sky_slime_bucket'),
        'damage': 2,
    },
    'tconstruct:ender_slime': {
        'item': Item.of('tconstruct:ender_slime_bucket'),
        'damage': 2,
    },
}