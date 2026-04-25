// priority: 500
MAAEvents.ftbCustomItemFilter('fit_heat_grinding_handle', event => {
    const stack = event.testItem
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 1000) return
    let attackDamageAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'minecraft:generic.attack_damage', 1), 2)
    if (attackDamageAttributeValue > 1) return
    event.setResult(true)
})