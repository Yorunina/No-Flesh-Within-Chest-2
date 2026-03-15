// priority: 500
MAAEvents.ftbCustomItemFilter('is_tetra_wrap_handle', event => {
    const stack = event.testItem
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    let pImproves = item.getImprovements(stack)
    for (let pImprove of pImproves) {
        if (pImprove.group == 'wrap') {
            return event.setResult(true)
        }
    }
})