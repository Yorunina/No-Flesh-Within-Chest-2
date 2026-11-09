// priority: 500

TetraCustomRequirement.register('enchantment_minecraft_riptide', ctx => {
    return StackHasEnchantment(ctx.targetStack, 'minecraft:riptide')
})

TetraCustomCraftingEffectCondition.register('enchantment_minecraft_riptide', ctx => {
    if (ctx.world().isClientSide()) return false
    return StackHasEnchantment(ctx.upgradedStack(), 'minecraft:riptide')
})

/**
 * @param {Internal.ItemStack} stack
 * @param {string} enchantmentId
 * @returns {boolean}
 */
function StackHasEnchantment(stack, enchantmentId) {
    return stack.enchantments.get(enchantmentId) > 0
}
