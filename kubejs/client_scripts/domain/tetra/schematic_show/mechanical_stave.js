// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowMechanicalStave(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    if (IsPreForge(stack, PreForgeTypeMechanicalSaw)) return customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('bow/mechanical_stave/mechanical_stave', SchematicShowMechanicalStave)