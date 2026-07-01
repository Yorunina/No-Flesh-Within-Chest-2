// priority: 500
ItemEvents.rightClicked('kubejs:organ_purification_tank', event => {
    const player = event.player
    if (!player.isCrouching()) return
    const item = event.item
    let outputList = []
    GetBundleContents(item).forEach((pStack) => {
        let nbt = pStack.getNbt()
        if (!nbt.contains('chestcavity:organ_compatibility')) return outputList.push(pStack.copyAndClear())
        nbt.remove('chestcavity:organ_compatibility')
        outputList.push(pStack.copyAndClear())
    })
    GivePlayerItemList(player, outputList)
    item.shrink(1)
})


ItemEvents.rightClicked('kubejs:organ_bundle', event => {
    const player = event.player
    if (!player.isCrouching()) return
    const item = event.item
    let outputList = []
    GetBundleContents(item).forEach((pStack) => {
        outputList.push(pStack.copyAndClear())
    })
    GivePlayerItemList(player, outputList)
    ClearBundle(item)
})
