// priority: 500

MAAClientEffects.setPlanarSightCondition(/** @param {Internal.LocalPlayer} player */ player => {
    if (!player.input.shiftKeyDown) return false
    for (let stack of [player.mainHandItem, player.offHandItem]) {
        let item = stack.getItem()
        if (TetraJSUtils.isModularItem(item) && item.getEffectLevel(stack, 'kubejs:planar_sniper') > 0) return true
    }
    return false
})
