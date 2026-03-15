// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowHeatRoughHandle(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()
    
    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 1000) return
    let attackDamageAttributeValue = modularItem.getAttributeValue(stack, 'minecraft:generic.attack_damage', 1)
    if (attackDamageAttributeValue > 1) return
    customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('double/heat_handle/heat_handle', SchematicShowHeatRoughHandle)
RegistrySchematicShowStrategy('double/rough_handle/rough_handle', SchematicShowHeatRoughHandle)
RegistrySchematicShowStrategy('single/heat_handle/heat_handle', SchematicShowHeatRoughHandle)
RegistrySchematicShowStrategy('single/rough_handle/rough_handle', SchematicShowHeatRoughHandle)
