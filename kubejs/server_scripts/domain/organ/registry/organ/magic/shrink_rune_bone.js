// priority: 500
RegistryOrgan('kubejs:shrink_rune_bone')
    .addScore('chestcavity:defense', 1)
    .addScore('chestcavity:endurance', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ShrinkRuneBoneChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let amount = GetCustomDataMap(chestCavity, 'hasShrinkRuneBoneAmount', 0)
    SetCustomDataMap(chestCavity, 'hasShrinkRuneBoneAmount', amount + 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ShrinkRuneBoneChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    let amount = GetCustomDataMap(chestCavity, 'hasShrinkRuneBoneAmount', 1)
    SetCustomDataMap(chestCavity, 'hasShrinkRuneBoneAmount', amount - 1)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:shrink_rune_bone')
        .addOnlyStrategy('organ_take_on', ShrinkRuneBoneChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', ShrinkRuneBoneChestCavityTakeOff)
)