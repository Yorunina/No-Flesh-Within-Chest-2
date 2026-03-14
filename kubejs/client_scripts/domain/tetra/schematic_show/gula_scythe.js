// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowGulaScythe(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    if (IsPreForge(stack, PreForgeTypePrimordialCradle)) return customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('double/gula_scythe/gula_scythe_right', SchematicShowGulaScythe)
RegistrySchematicShowStrategy('double/gula_scythe/gula_scythe_left', SchematicShowGulaScythe)