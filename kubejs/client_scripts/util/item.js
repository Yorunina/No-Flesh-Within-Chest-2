// priority: 3000
/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {number}
 */
function GetModularItemMineSpeed(stack) {
    return Math.round(
        TetraJS$ItemModularHandheld.getAttackSpeedHarvestModifier(
            stack.getItem().getAttributeValue(stack, 'minecraft:generic.attack_speed', 4.0)) *
        stack.getItem().getToolData(stack).getEfficiency($ToolAction.get('pickaxe_dig'))
    )
}