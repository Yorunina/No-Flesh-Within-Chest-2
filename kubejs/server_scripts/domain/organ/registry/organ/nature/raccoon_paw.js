// priority: 500
RegistryOrgan('kubejs:raccoon_paw')
    .addScore('chestcavity:strength', 1)
    .addScore('kubejs:knockback', 3)
    .setCanSpawn(true)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemEntityInteractedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RacconPawEntityInteract(customData, event, organItem, organIndex, slotType) {
    const target = event.target
    const player = event.player
    if (event.hand != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return
    if (OrganItemCoolDown(player, organItem)) return
    switch (target.type) {
        case 'minecraft:villager':
            break
        default:
            let allSlotsList = []
            let i = 0
            target.getAllSlots().forEach(item => {
                if (!item.isEmpty() && !item.hasEnchantment('minecraft:binding_curse', 1)) {
                    allSlotsList.push({ item: item, slot: i })
                }
                i++
            })
            if (allSlotsList.length == 0) return
            let randomObj = RandomGet(allSlotsList)
            SpawnLootAtLocation(event.level, player.blockPosition(), [randomObj.item])
            target.setItemSlot(EquimentSlotList[randomObj.slot], Item.empty)
    }

    player.addItemCooldown(organItem, 20 * 10)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:raccoon_paw')
        .addOnlyStrategy('entity_interact', RacconPawEntityInteract)
)
