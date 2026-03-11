// priority: 500
/**
 * @param {SchematicShowStrategyCustomData} customData 
 * @param {Internal.WorkbenchTileUpdateSchematicListJS} event 
 * @param {Internal.ItemStack} targetItemStack 
 * @param {Internal.Schematic} schematic 
 */
function SchematicShowAncientFlambergeBlade(customData, event, targetItemStack, schematic) {
    const stages = AStagesClient.getServerAndPlayerClientStages()
    if (stages.contains('ftb_genesis_process_done')) return customData.resList.push(schematic)
    /**@type {Internal.ModularItem} */
    let modularItem = targetItemStack.getItem()
    // 非传古武器烧伤技能效率需要大于等于15，对应打磨4的改良属性
    let burnsEfficiency = modularItem.getEffectEfficiency(targetItemStack, 'kubejs:burns')
    if (burnsEfficiency < 20) return
    let attackDamageAttributeValue = modularItem.getAttributeValue(targetItemStack, 'minecraft:generic.attack_damage')
    if (attackDamageAttributeValue < 11) return
    customData.resList.push(schematic)
}
RegistrySchematicShowStrategy('sword/ancient_flamberge/ancient_flamberge_blade', SchematicShowAncientFlambergeBlade)