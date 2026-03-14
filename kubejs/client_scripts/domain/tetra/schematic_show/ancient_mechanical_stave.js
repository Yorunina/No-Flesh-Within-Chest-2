// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowAncientMechanicalStave(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()

    let seekingArrowEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:seeking_arrow')
    if (seekingArrowEfficiency < 14) return
    let drawSpeedAttributeValue = modularItem.getAttributeValue(stack, 'tetra:draw_speed')
    if (drawSpeedAttributeValue > 1.6) return
    customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('bow/ancient_mechanical_stave/ancient_mechanical_stave', SchematicShowAncientMechanicalStave)