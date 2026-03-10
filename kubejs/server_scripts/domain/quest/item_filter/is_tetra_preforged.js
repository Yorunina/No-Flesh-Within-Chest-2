// priority: 500
MAAEvents.ftbCustomItemFilter('is_tetra_preforged', event => {
    const item = event.testItem
    if (!TetraJSUtils.isModularItem(item.getItem())) return
    const args = event.args
    if (args.length <= 0) return
    let targetType = String(args[0])
    if (IsPreForge(item, targetType)) event.setResult(true)
})