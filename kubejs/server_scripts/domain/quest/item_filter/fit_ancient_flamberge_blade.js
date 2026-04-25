// priority: 500
MAAEvents.ftbCustomItemFilter('fit_ancient_flamberge_blade', event => {
    const stack = event.testItem
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let burnsEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:burns')
    if (burnsEfficiency < 20) return
    let attackDamageAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'minecraft:generic.attack_damage', 1), 2)
    if (attackDamageAttributeValue < 12) return
    event.setResult(true)
})