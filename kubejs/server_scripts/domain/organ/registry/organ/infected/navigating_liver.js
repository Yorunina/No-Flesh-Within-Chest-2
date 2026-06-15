// priority: 500
RegistryOrgan('kubejs:navigating_liver')
    .addScore('chestcavity:defense', -1)
    .addScore('chestcavity:detoxification', 1)

const NavigatingLiverSearchRadius = 8000
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function NavigatingLiverEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const server = entity.server
    /**@type {Internal.ServerLevel} */
    const level = event.level
    // if (entity.age % 100 != 0) return
    const nbt = organItem.getNbt()
    if (nbt.getInt('locating') != 0) return

    let itemList = GetBundleContents(organItem)
    if (itemList.length <= 0) return

    let selectorStack = itemList.find(p => p.getItem() instanceof $BaseSelectorItem)
    if (!selectorStack) return

    /**@type {ResourceLocation} */
    let targetId = selectorStack.getItem().getSelectedEntry(selectorStack)
    if (!targetId) return nbt.putInt('locating', 2)

    if (selectorStack.is('maa:structure_selector')) {
        let structureHolderSetOpt = MAAUtils.getStructureHolderSet(server, targetId)
        if (!structureHolderSetOpt.isPresent()) return nbt.putInt('locating', 2)
        let structureHolderSet = structureHolderSetOpt.get()
        let task = $AsyncLocator.locate(level, structureHolderSet, entity.blockPosition(), NavigatingLiverSearchRadius, false)
        nbt.putInt('locating', 1)
        task.then((ctx) => {
            let targetPos = ctx.getFirst()
            if (!targetPos) return nbt.putInt('locating', 2)
            // scheduleInTicks回调到主线程
            server.scheduleInTicks(1, () => {
                if (!organItem) return
                nbt.putInt('locating', 0)

                let mapItem = $MapItem.create(level, targetPos.x, targetPos.z, 1, true, true)
                $MapItem.renderBiomePreviewMap(level, mapItem)
                $MapItemSavedData.addTargetDecoration(mapItem, targetPos, '+', $MapDecorationType.RED_X)
                mapItem = mapItem.withName(Text.translatable('structure.' + targetId.getNamespace() + '.' + targetId.getPath()))
                RemoveBundleItem(organItem, 0, 1)
                AddItemIntoBundle(organItem, mapItem, 1, (pStack) => 1)

                level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), 'item.book.page_turn', entity.getSoundSource(), 0.5, 1)
            })
        })
    } else if (selectorStack.is('maa:biome_selector')) {
        nbt.putInt('locating', 1)
        MAAUtils.searchBiomeAsync(level, targetId, entity.blockPosition(), NavigatingLiverSearchRadius, (targetPos) => {
            if (!targetPos) return nbt.putInt('locating', 2)
            server.scheduleInTicks(1, () => {
                if (!organItem) return
                nbt.putInt('locating', 0)

                let mapItem = $MapItem.create(level, targetPos.x, targetPos.z, 1, true, true)
                $MapItem.renderBiomePreviewMap(level, mapItem)
                $MapItemSavedData.addTargetDecoration(mapItem, targetPos, '+', $MapDecorationType.RED_X)
                mapItem = mapItem.withName(Text.translatable('biome.' + targetId.getNamespace() + '.' + targetId.getPath()))
                RemoveBundleItem(organItem, 0, 1)
                AddItemIntoBundle(organItem, mapItem, 1, (pStack) => 1)

                level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), 'item.book.page_turn', entity.getSoundSource(), 0.5, 1)
            })
        })
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:navigating_liver')
        .addOnlyStrategy('entity_tick', NavigatingLiverEntityTick)
)

ItemEvents.rightClicked('kubejs:navigating_liver', event => {
    const player = event.player
    const item = event.item
    const nbt = item.getNbt()

    let outputList = []
    GetBundleContents(item).forEach((pStack) => {
        outputList.push(pStack.copyAndClear())
    })
    GivePlayerItemList(player, outputList)
    ClearBundle(item)
    nbt.putInt('locating', 0)
})