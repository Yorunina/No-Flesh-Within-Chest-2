// priority: 500
RegistryOrgan('kubejs:turkey_gizzard')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:nutrition', 1)
    .setCanSpawn(true)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function TurkeyGizzardFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    if (!player) return
    const level = event.level
    const item = event.item
    let foodProperties = item.getFoodProperties(player)
    if (!foodProperties) return
    if (foodProperties.canAlwaysEat()) return
    if (RandomWithPlayerLuck(player) <= 0.6) return
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let eightDirectionRelativeSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, EightDirectionOffset)
    for (let slotDefinition of eightDirectionRelativeSlot) {
        let curItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (curItem.isEmpty()) continue

        let processingInv = new $ProcessingInventory(ctx => { })
        processingInv.insertItem(curItem, false)
        let warpper = new $RecipeWrapper(processingInv)
        let curshingRecipe = $CreateRecipesType.CRUSHING.find(warpper, level)
        if (!curshingRecipe.isPresent()) {
            curshingRecipe = $CreateRecipesType.MILLING.find(warpper, level)
        }
        if (!curshingRecipe.isPresent()) {
            continue
        }

        /**@type {Internal.ItemStack[]} */
        let outputItemList = curshingRecipe.get().rollResults()
        if (outputItemList.length <= 0) {
            continue
        }
        curItem.shrink(1)
        SpawnLootAtLocation(level, player.blockPosition(), outputItemList.toArray())
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:turkey_gizzard')
        .addOnlyStrategy('food_eaten', TurkeyGizzardFoodEaten)
)