// priority: 500
RegistryOrgan('kubejs:rose_quartz_dialyzer')
    .addScore('chestcavity:filtration', 2.0)
    .addScore('chestcavity:defense', -1)
    .addScore('kubejs:rosy', 0.5)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RoseQuartzDialyzerKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    let repairValue = chestCavity.getOrganScore('kubejs:rosy') * 3
    switch (slotType) {
        case 'rosy_explosion': {
            repairValue = repairValue + chestCavity.getOrganScore('chestcavity:filtration') * chestCavity.inventory.countNonEmpty()
            break
        }
    }
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
        let item = chestCavity.inventory.getItem(i)
        if (item.getMaxDamage() <= 0) continue
        let damgeValue = item.getDamageValue()
        if (repairValue > damgeValue) {
            repairValue = repairValue - damgeValue
            item.setDamageValue(0)
        } else {
            item.setDamageValue(damgeValue - repairValue)
            repairValue = 0
            break
        }
    }
    player.addItemCooldown(organItem, 20 * 60)
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rose_quartz_dialyzer')
        .addOnlyStrategy('key_active', RoseQuartzDialyzerKeyActiveOnly)
)