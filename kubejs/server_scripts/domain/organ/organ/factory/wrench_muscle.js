// priority: 500

RegistryOrgan('kubejs:wrench_muscle')
    .addScore('chestcavity:strength', 1)

const targetItems = [
    'kubejs:mechanical_press',
    'kubejs:mechanical_mixer',
    'kubejs:item_drain',
    'kubejs:spout',
    'kubejs:deployer',
    'kubejs:encased_fan',
    'kubejs:mechanical_saw',
    'kubejs:crushing_wheel'
]
/**
 * 处理器官事件：item_right_clicked。
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemClickedEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function wrenchMuscleItemRightClicked(customData, event, organItem, organIndex, slotType) {
    const item = event.item
    if (item.isEmpty()) return
    let itemId = item.getId()
    if (targetItems.includes(itemId)) {
        let itemNbt = item.getNbt()
        if (itemNbt.contains('otherbeltmode')) {
            itemNbt.remove('otherbeltmode')
        } else {
            itemNbt.putInt('otherbeltmode', 1)
        }
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:wrench_muscle')
        .addOnlyStrategy('item_right_clicked', wrenchMuscleItemRightClicked)
)
