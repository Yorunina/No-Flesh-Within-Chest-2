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
        pStack.removeTagKey('Items')
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
        pStack.removeTagKey('Items')
    }
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
 * @param {Internal.ItemStack} stack 
 * @param {function(Internal.ItemStack): number} weightFunc 
 * @returns {number}
 */
function GetBundleCountentWeight(stack, weightFunc) {
    let stackList = GetBundleContents(stack)
    let weight = 0
    stackList.forEach(stack => weight += weightFunc(stack))
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
    let matchTagOpt = items.stream()
        .filter(tag => $ItemStack.isSameItemSameTags($ItemStack.of(tag), remainder))
        .findFirst()
    if (matchTagOpt.isPresent()) {
        let matchTag = matchTagOpt.get()
        let matchItem = $ItemStack.of(matchTag)
        if (matchItem.getCount() >= matchItem.getMaxStackSize()) {
            items.add(0, remainder.save(new CompoundTag()))
        } else {
            matchItem.grow(remainder.getCount())
            matchItem.save(matchTag)
            items.remove(matchTag)
            items.add(0, matchTag)
        }
    } else {
        items.add(0, remainder.save(new $CompoundTag()))
    }
    return insertCount
}