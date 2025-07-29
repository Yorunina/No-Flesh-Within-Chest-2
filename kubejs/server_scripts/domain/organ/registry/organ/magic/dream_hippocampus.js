// priority: 500
RegistryOrgan('kubejs:dream_hippocampus')
    .addScore('chestcavity:nerves', 1)
    .addScore('kubejs:magic_capacity', 1)

/**
 * 
 * @param {any} customData 
 * @param {Internal.ItemClickedEventJS} event 
 * @param {Internal.ItemStack} organItem 
 * @param {number} organIndex 
 * @param {string} slotType 
 */
function DreamHippocampusItemRightClicked(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const item = event.item
    if (item.id != 'exposure:dream_film') return
    if (player.isShiftKeyDown()) return
    item.removeTag()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dream_hippocampus')
        .addOnlyStrategy('item_right_clicked', DreamHippocampusItemRightClicked)
)
