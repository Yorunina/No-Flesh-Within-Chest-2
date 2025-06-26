// priority: 500
// RegistryOrgan('kubejs:test')
//     .addScore('chestcavity:test', -0.5)


// RegistryOrganStrategy(
//     new OrganStrategyModel('kubejs:test')
// )



// /**
//  * @param {OrganChestCavityUpdateStrategyCustomData} customData
//  * @param {Internal.EvaluateChestCavityJS} event
//  * @param {Internal.ItemStack} organItem
//  * @param {number} organIndex
//  * @param {string} slotType
//  */
// function DragonBloodLiverChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
//     const chestCavity = event.chestCavity
//     const inventoryTypeData = chestCavity.inventoryTypeData
//     let curSlot = inventoryTypeData.getSlotDefinition(organIndex)
//     let curRelativePositionX = curSlot.getRelativeX()
//     let curRelativePositionY = curSlot.getRelativeY()

//     for (let [offsetX, offsetY] of EightDirectionOffset) {
//         let slotDefinition = invTypeData.getRelativeSlotDefinition(curRelativePositionX + offsetX, curRelativePositionY + offsetY)
//         if (!slotDefinition) continue
//         let curItem = ccInv.getStackInSlot(slotDefinition.getId())
//         if (curItem.isEmpty()) continue
//     }
//     customData.attackDamage.addAttributeModifier(attackUp, 'addition', 'base')
//     customData.maxHealth.addAttributeModifier(healthUp, 'addition', 'base')
// }

// RegistryOrganStrategy(
//     new OrganStrategyModel('kubejs:dragon_blood_liver')
//         .addOnlyStrategy('chest_cavity_update', DragonBloodLiverChestCavityUpdate)
// )