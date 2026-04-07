// priority: 500
MAAEvents.ftbCustomItemFilter('final_primal_miracle', event => {
    const stack = event.testItem
    if (!stack.is('kubejs:primal_miracle')) return
    const nbt = item.getOrCreateTag()
    if (nbt.getInt('value') >= 10) event.setResult(true)
})