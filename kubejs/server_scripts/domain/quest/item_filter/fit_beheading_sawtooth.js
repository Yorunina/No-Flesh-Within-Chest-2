// priority: 500
MAAEvents.ftbCustomItemFilter('fit_beheading_sawtooth', event => {
    const stack = event.testItem
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let attackDamageAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'minecraft:generic.attack_damage', 1), 2)
    if (attackDamageAttributeValue < 9) return
    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 2000) return
    event.setResult(true)
})