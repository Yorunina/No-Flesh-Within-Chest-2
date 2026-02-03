// priority: 500
BlockEvents.rightClicked('tconstruct:magma_cake', event => {
    const level = event.level
    const entity = event.entity
    let fireTicks = entity.getRemainingFireTicks()
    if (fireTicks < 11980) return
    const chestCavity = entity.chestCavityInstance
    const ccInv = chestCavity.inventory

    let recipeItems = {
        'minecraft:iron_block': 16,
        'minecraft:gold_block': 16,
        'minecraft:redstone_block': 16,
        'create:brass_block': 16,
        'create_connected:control_chip': 16,
    }
    let extractSlot = {}
    for (let i = 0; i < ccInv.getSlots(); i++) {
        let curItem = ccInv.getStackInSlot(i)
        if (!curItem || curItem.isEmpty()) continue
        for (let itemId in recipeItems) {
            if (recipeItems[itemId] <= 0) continue
            if (!curItem.is(itemId)) continue
            if (curItem.getCount() > recipeItems[itemId]) {
                extractSlot[i] = recipeItems[itemId]
                recipeItems[itemId] = 0
            } else {
                extractSlot[i] = curItem.getCount()
                recipeItems[itemId] = recipeItems[itemId] - curItem.getCount()
            }
        }
    }
    // 校验材料是否满足
    for (let i in recipeItems) {
        if (recipeItems[i] > 0) {
            console.log('缺少材料' + i + 'x' + recipeItems[i])
            return
        }
    }
    // 提取材料
    for (let i in extractSlot) {
        ccInv.extractItem(i, extractSlot[i], false)
    }
    chestCavity.setInventoryType('kubejs:cc_inventory_types/')
    entity.setRemainingFireTicks(fireTicks - 11980)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'ui.toast.challenge_complete', player.getSoundSource(), 0.5, 1)
})
