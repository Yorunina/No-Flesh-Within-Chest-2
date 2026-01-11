// priority: 500
RegistryOrgan('kubejs:worm_of_gula')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:nutrition', 1)
    .addScore('chestcavity:endurance', -3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WormOfGulaEntityTick(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const player = event.entity
    const level = event.level
    if (!player.isPlayer()) return
    const foodData = player.getFoodData()
    if (foodData.getFoodLevel() < 18) return
    const chestCavity = event.chestCavity
    let inventory = chestCavity.inventory
    if (inventory.canAddItem(Item.of('kubejs:gula_worm_nest'))) {
        inventory.addItem(Item.of('kubejs:gula_worm_nest'))
        foodData.setFoodLevel(4)
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 0.5, 1)
    }

    if (!inventory.hasAnyMatching((ctx) => !ctx.is('kubejs:gula_worm_nest') && !ctx.is('kubejs:worm_of_gula'))) {
        chestCavity.setInventoryType('kubejs:cc_inventory_types/gula')
        inventory = chestCavity.inventory
        inventory.clear()
        for (let i = 0; i < inventory.getContainerSize(); i++) {
            inventory.setStackInSlot(i, Item.of('kubejs:deserted_gula_worm_nest'))
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:worm_of_gula')
        .addOnlyStrategy('entity_tick', WormOfGulaEntityTick)
)