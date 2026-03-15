// priority: 500
MAAEvents.ftbCustomItemFilter('fit_coupler', event => {
    const stack = event.testItem
    const modularItem = stack.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let maxDamage = modularItem.getMaxDamage(stack)
    if (maxDamage < 2000) return
    let mineSpeed = GetModularItemMineSpeed(stack)
    if (mineSpeed < 9) return
    event.setResult(true)
})