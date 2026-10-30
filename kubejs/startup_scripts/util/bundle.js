// priority: 1000

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {Optional<Internal.ItemStack>}
 */
function RemoveBundleOneStack(stack) {
    let nbt = stack.getNbt()
    if (nbt == null || !nbt.contains('Items')) return Optional.empty()

    let items = nbt.getList('Items', TAG_COMPOUND)
    if (items.isEmpty()) return Optional.empty()

    let pStack = $ItemStack.of(items.getCompound(0))
    items.remove(0)
    if (items.isEmpty()) {
        nbt.remove('Items')
    }
    return Optional.of(pStack)
}

/**
 * 按内容索引扣除物品数量，并移除耗尽的条目。
 * @param {Internal.ItemStack} stack
 * @param {number} index
 * @param {number} count
 * @returns {void}
 */
function RemoveBundleItem(stack, index, count) {
    let nbt = stack.getNbt()
    if (nbt == null || !nbt.contains('Items')) return

    let items = nbt.getList('Items', TAG_COMPOUND)
    if (index < 0 || index >= items.size()) return

    let pStack = $ItemStack.of(items.getCompound(index))
    pStack.shrink(count)

    if (pStack.isEmpty() || pStack.getCount() == 0) {
        items.remove(index)
    } else {
        items.set(index, pStack.save(new $CompoundTag()))
    }

    if (items.isEmpty()) {
        nbt.remove('Items')
    }
}

/**
 * 清空收纳袋内所有物品
 * @param {Internal.ItemStack} stack
 * @returns {Internal.ItemStack[]} 被移除的物品列表
 */
function ClearBundle(stack) {
    let contents = GetBundleContents(stack)
    if (contents.length == 0) return []
    let nbt = stack.getNbt()
    if (nbt != null) nbt.remove('Items')
    return contents
}

/**
 * 
 * @param {Internal.Entity} entity 
 */
function PlayBundleRemoveSound(entity) {
    entity.playSound('item.bundle.remove_one', 0.8, 0.8 + entity.level.getRandom().nextFloat() * 0.4)
}

/**
 * 
 * @param {Internal.Entity} entity 
 */
function PlayerBundleInsertSound(entity) {
    entity.playSound('item.bundle.insert', 0.8, 0.8 + entity.level.getRandom().nextFloat() * 0.4)
}


/**
 * 读取收纳袋内容；无 NBT 时返回空数组，否则返回 Java 列表。
 * @param {Internal.ItemStack} stack
 * @returns {Internal.ItemStack[] | Internal.List<Internal.ItemStack>}
 */
function GetBundleContents(stack) {
    let nbt = stack.getNbt()
    if (nbt == null) return []
    let listTag = nbt.getList('Items', TAG_COMPOUND)
    return listTag.stream().map(
        (pTag) => $ItemStack.of(pTag)
    ).toList()
}

/**
 * 按每个物品的单件权重计算收纳袋总重量。
 * @param {Internal.ItemStack} stack
 * @param {(stack: Internal.ItemStack) => number} weightFunc
 * @returns {number}
 */
function GetBundleCountentWeight(stack, weightFunc) {
    let stackList = GetBundleContents(stack)
    let weight = 0
    stackList.forEach(stack => weight += weightFunc(stack) * stack.getCount())
    return weight
}

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {number}
 */
function GetBundleStackWeight(stack) {
    return 64 / stack.getMaxStackSize()
}

/**
 * 按权重上限插入物品，返回实际存入数量；不扣除传入堆叠。
 * @param {Internal.ItemStack} bundleStack
 * @param {Internal.ItemStack} insertedStack
 * @param {number} maxWeight
 * @param {(stack: Internal.ItemStack) => number} weightFunc
 * @returns {number}
 */
function AddItemIntoBundle(bundleStack, insertedStack, maxWeight, weightFunc) {
    if (insertedStack.isEmpty() || !insertedStack.getItem().canFitInsideContainerItems()) return 0

    let nbt = bundleStack.getOrCreateTag()
    if (!nbt.contains('Items')) {
        nbt.put('Items', new $ListTag())
    }
    let currentWeight = GetBundleCountentWeight(bundleStack, weightFunc)
    let insertedWeight = weightFunc(insertedStack)
    if (insertedWeight <= 0 || currentWeight >= maxWeight) return 0
    let insertCount = Math.floor(Math.min(insertedStack.getCount(), (maxWeight - currentWeight) / insertedWeight))

    if (insertCount <= 0) return 0

    let items = nbt.getList('Items', TAG_COMPOUND)
    let remainder = insertedStack.copyWithCount(insertCount)
    for (let i = 0; i < items.size() && !remainder.isEmpty(); i++) {
        let matchItem = $ItemStack.of(items.getCompound(i))
        if (!$ItemStack.isSameItemSameTags(matchItem, remainder)) continue
        let mergeCount = Math.min(remainder.getCount(), matchItem.getMaxStackSize() - matchItem.getCount())
        if (mergeCount <= 0) continue
        matchItem.grow(mergeCount)
        items.set(i, matchItem.save(new $CompoundTag()))
        remainder.shrink(mergeCount)
    }
    while (!remainder.isEmpty()) {
        let stackCount = Math.min(remainder.getCount(), remainder.getMaxStackSize())
        items.add(0, remainder.copyWithCount(stackCount).save(new $CompoundTag()))
        remainder.shrink(stackCount)
    }
    return insertCount
}

/**
 * 生成光标物品与槽内收纳袋交互的回调，返回值表示是否接管点击。
 * @param {number} maxWeight
 * @param {(stack: Internal.ItemStack) => boolean} [accepts]
 * @param {boolean} [consumeRejected=false]
 * @returns {(stack: Internal.ItemStack, otherStack: Internal.ItemStack, slot: Internal.Slot, action: Internal.ClickAction, player: Internal.Player, access: Internal.SlotAccess) => boolean}
 */
function BundleStackedOnMe(maxWeight, accepts, consumeRejected) {
    return (stack, otherStack, slot, action, player, access) => {
        if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
        if (otherStack.isEmpty()) {
            let contents = GetBundleContents(stack)
            if (contents.length == 0) return true
            let firstItem = contents[0]
            let takeCount = Math.min(firstItem.getCount(), firstItem.getMaxStackSize())
            if (takeCount > 0 && access.set(firstItem.copyWithCount(takeCount))) {
                RemoveBundleItem(stack, 0, takeCount)
                PlayBundleRemoveSound(player)
            }
        } else {
            if (accepts && !accepts(otherStack)) return !!consumeRejected
            let added = AddItemIntoBundle(stack, otherStack, maxWeight, item => 1)
            if (added > 0) {
                PlayerBundleInsertSound(player)
                otherStack.shrink(added)
            }
        }
        return true
    }
}

/**
 * 生成光标收纳袋与目标槽交互的回调，返回值表示是否接管点击。
 * @param {number} maxWeight
 * @param {(stack: Internal.ItemStack) => boolean} [accepts]
 * @param {boolean} [consumeRejected=false]
 * @returns {(stack: Internal.ItemStack, slot: Internal.Slot, action: Internal.ClickAction, player: Internal.Player) => boolean}
 */
function BundleStackedOnOther(maxWeight, accepts, consumeRejected) {
    return (stack, slot, action, player) => {
        if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
        let otherStack = slot.getItem()
        if (otherStack.isEmpty()) {
            let contents = GetBundleContents(stack)
            if (contents.length == 0) return true
            let item = contents[0].copy()
            let originalCount = item.getCount()
            let remainder = slot.safeInsert(item)
            let insertedCount = originalCount - remainder.getCount()
            if (insertedCount > 0) {
                RemoveBundleItem(stack, 0, insertedCount)
                PlayBundleRemoveSound(player)
            }
        } else {
            if (accepts && !accepts(otherStack)) return !!consumeRejected
            if (!otherStack.getItem().canFitInsideContainerItems()) return true
            let available = Math.floor(maxWeight - GetBundleCountentWeight(stack, item => 1))
            let takeCount = Math.min(otherStack.getCount(), available)
            if (takeCount <= 0) return true
            // Bound the take first: output-only slots cannot accept a returned surplus.
            let taken = slot.safeTake(takeCount, 65535, player)
            let added = AddItemIntoBundle(stack, taken, maxWeight, item => 1)
            if (added > 0) PlayerBundleInsertSound(player)
            if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
        }
        return true
    }
}

/**
 * 按内容条目数计算物品栏容量条宽度，最大为 13。
 * @param {Internal.ItemStack} stack
 * @param {number} slots
 * @returns {number}
 */
function BundleBarWidth(stack, slots) {
    return Math.min(1 + 12 * GetBundleContents(stack).length / (slots || 1), 13)
}

/**
 * 生成包含内容列表和重量的收纳袋提示组件。
 * @param {Internal.ItemStack} stack
 * @param {(stack: Internal.ItemStack) => number} [weightFunc]
 * @returns {Internal.Optional<Internal.BundleTooltip>}
 */
function BundleTooltip(stack, weightFunc) {
    let items = $NonNullList.create()
    GetBundleContents(stack).forEach(item => items.add(item))
    return Optional.of(
        new $BundleTooltip(
            items,
            GetBundleCountentWeight(stack, weightFunc || (item => 1))
        )
    )
}
