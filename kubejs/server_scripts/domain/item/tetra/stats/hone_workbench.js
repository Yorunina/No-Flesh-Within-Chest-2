// priority: 0

// 在卷轴书写等产物替换监听之后，处理工作台最终产物。
TetraJSEvents.workbenchTileCraft(/** @param {Internal.WorkbenchTileCraftEventJS} event */ event => {
    if (event.level.isClientSide()) return
    let stack = event.upgradedStack
    if (stack.isEmpty() || !stack.hasNBT()) return
    let nbt = stack.getNbt()
    if (nbt.getByte('hone_ready') != 1) return
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return

    // 此事件位于 Tetra 的 removeHoneable/进度恢复之后、产物入槽之前。
    // 原地修改产物，沿用工作台原有的入槽与同步流程。
    item.setHoningProgress(stack, 0)
    nbt.remove('hone_ready')
})
