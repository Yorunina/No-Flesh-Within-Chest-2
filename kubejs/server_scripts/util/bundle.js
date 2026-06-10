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
 * 
 * @param {Internal.ItemStack} stack 
 * @param {number} index 
 * @returns 
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
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {Internal.ItemStack[]}
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
 * 
 * @param {Internal.ItemStack[]} stacks
 * @returns {Internal.ItemStack[]}
 */
function SetBundleContents(stacks) {
}

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @param {function(Internal.ItemStack): number} weightFunc 
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
 * 
 * @param {Internal.ItemStack} bundleStack 
 * @param {Internal.ItemStack} insertedStack 
 * @param {number} maxWeight 
 * @param {function(Internal.ItemStack): number} weightFunc 
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
    let insertCount = Math.min(insertedStack.getCount(), (maxWeight - currentWeight) / insertedWeight)

    if (insertCount == 0) return 0

    let items = nbt.getList('Items', TAG_COMPOUND)
    let remainder = insertedStack.copyWithCount(insertCount)
    let matchIdx = -1
    for (let i = 0; i < items.size(); i++) {
        if ($ItemStack.isSameItemSameTags($ItemStack.of(items.getCompound(i)), remainder)) {
            matchIdx = i
            break
        }
    }
    if (matchIdx >= 0) {
        let matchItem = $ItemStack.of(items.getCompound(matchIdx))
        if (matchItem.getCount() >= matchItem.getMaxStackSize()) {
            items.add(0, remainder.save(new $CompoundTag()))
        } else {
            matchItem.grow(remainder.getCount())
            items.set(matchIdx, matchItem.save(new $CompoundTag()))
        }
    } else {
        items.add(0, remainder.save(new $CompoundTag()))
    }
    return insertCount
}