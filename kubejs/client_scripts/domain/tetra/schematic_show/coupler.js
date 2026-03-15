// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowCoupler(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()

    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 2000) return
    let mineSpeed = GetModularItemMineSpeed(stack)
    if (mineSpeed < 9) return
    customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('double/coupler', SchematicShowCoupler)
RegistrySchematicShowStrategy('single/coupler', SchematicShowCoupler)
