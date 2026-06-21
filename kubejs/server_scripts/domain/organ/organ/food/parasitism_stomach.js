// priority: 500
RegistryOrgan('kubejs:parasitism_stomach')
    .addScore('chestcavity:endurance', 0.5)
    .addScore('chestcavity:nutrition', 1)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.FoodEatenEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ParasitismStomachFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    if (!player) return
    if (OrganItemCoolDown(player, organItem)) return
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const foodItem = event.item
    if (!foodItem) return
    let foodPro = foodItem.getFoodProperties(player)
    if (!foodPro) return
    let nutrition = foodPro.getNutrition()
    let staturation = foodPro.getSaturationModifier() * nutrition * 2
    let organItemCount = ccInv.count(foodItem)
    let attackUp = (staturation + nutrition) * organItemCount * 0.2
    SetCustomDataMap(chestCavity, 'parasitismStomachCounter', 3)
    SetCustomDataMap(chestCavity, 'parasitismStomachAttackUp', attackUp)
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText('3')
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown(organItem, 20 * 3)
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ParasitismStomachTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'parasitismStomachCounter', 0)
    SetCustomDataMap(chestCavity, 'parasitismStomachAttackUp', 0)
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:parasitism_stomach')
    }
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ParasitismStomachDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    let counter = GetCustomDataMap(chestCavity, 'parasitismStomachCounter', 0)
    if (counter == 0) return
    event.amount = event.amount + GetCustomDataMap(chestCavity, 'parasitismStomachAttackUp', 0)
    let curCounter = counter - 1
    SetCustomDataMap(chestCavity, 'parasitismStomachCounter', curCounter)
    if (curCounter == 0) {
        RemoveOrganEffect(chestCavity, 'kubejs:parasitism_stomach')
    } else {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText(curCounter.toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:parasitism_stomach')
        .addOnlyStrategy('food_eaten', ParasitismStomachFoodEaten)
        .addOnlyStrategy('organ_take_off', ParasitismStomachTakeOff)
        .addOnlyStrategy('entity_do_damage', ParasitismStomachDoDamage)
)