// priority: 500

MAAEvents.ftbCustomItemFilter('tetra_effect_check', /** @param {Internal.FTBCustomItemFilterEventJS} event */ event => {
    const args = event.args
    if (args.length < 4) return
    const stack = event.testItem
    if (stack.isEmpty()) return
    const item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return
    // 裸模块化物品（无部件 NBT）getEffectData 为 null，getEffectLevel 同样会 NPE，先剔除
    if (item.getAllModules(stack).isEmpty()) return
    const mode = String(args[0])
    const effectKey = String(args[1])
    const op = String(args[2])
    const threshold = parseFloat(args[3])
    if (isNaN(threshold)) return
    let value
    if (mode === 'level') value = item.getEffectLevel(stack, effectKey)
    else if (mode === 'efficiency') value = item.getEffectEfficiency(stack, effectKey)
    else if (mode === 'improvement') {
        // 存在性判定：任一大模块槽位带该 improvement 的 NBT 键即视为等级 1，
        // 否则 0（此类 improvement 存储等级恒为 0，无法用 tetra_improvement_level 区分有无）
        const tag = stack.nbt
        if (!tag) return
        for (let slot of item.getMajorModuleKeys(stack)) {
            if (tag.contains(slot + ':' + effectKey)) {
                value = 1
                break
            }
        }
        if (value === undefined) value = 0
    }
    else return
    let pass = false
    switch (op) {
        case '>=': pass = value >= threshold; break
        case '<=': pass = value <= threshold; break
        case '>': pass = value > threshold; break
        case '<': pass = value < threshold; break
        case '==': case '=': pass = value === threshold; break
        default: return
    }
    if (pass) event.setResult(true)
})
