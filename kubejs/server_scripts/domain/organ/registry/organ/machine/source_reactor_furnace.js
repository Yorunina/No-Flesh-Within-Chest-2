// priority: 500
RegistryOrgan('kubejs:source_reactor_furnace')
    .addScore('chestcavity:health', 1)
    .addScore('kubejs:magic_capacity', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SourceReactorFurnaceEntityTick(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, FourDirectionOffset)
    for (let slotDefinition of aroundRelativeSlots) {
        let curItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (curItem.isEmpty()) continue
        if (!curItem.is('ars_nouveau:source_jar')) continue
        SourceJarItemAddSource(curItem, 10)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:source_reactor_furnace')
        .addOnlyStrategy('entity_tick', SourceReactorFurnaceEntityTick)
)

FTBTeamsEvents.playerJoinedParty(event => {
    
})