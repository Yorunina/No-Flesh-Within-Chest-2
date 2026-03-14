// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} stack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowAncientGulaScythe(customData, event, stack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()
    // 非传古武器吸收血肉效率大于10且攻速大于1，理念是需要一个头不是饕餮镰而是其他工具头
    let devourBloodEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:devour_blood')
    if (devourBloodEfficiency < 10) return
    let attackSpeedAttributeValue = modularItem.getAttributeValue(stack, 'generic.attack_speed')
    if (attackSpeedAttributeValue < -3) return
    customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('double/ancient_gula_scythe/ancient_gula_scythe_right', SchematicShowAncientGulaScythe)
RegistrySchematicShowStrategy('double/ancient_gula_scythe/ancient_gula_scythe_left', SchematicShowAncientGulaScythe)
