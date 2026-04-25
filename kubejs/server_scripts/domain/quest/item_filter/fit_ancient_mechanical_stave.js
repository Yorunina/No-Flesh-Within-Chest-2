// priority: 500
MAAEvents.ftbCustomItemFilter('fit_ancient_mechanical_stave', event => {
    const stack = event.testItem
    /**@type {Internal.ModularItem} */
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let seekingArrowEfficiency = modularItem.getEffectEfficiency(stack, 'kubejs:seeking_arrow')
    if (seekingArrowEfficiency < 14) return
    let drawSpeedAttributeValue = RoundFix(modularItem.getAttributeValue(stack, 'tetra:draw_speed'), 2)
    if (drawSpeedAttributeValue > 1.6) return
    event.setResult(true)
})