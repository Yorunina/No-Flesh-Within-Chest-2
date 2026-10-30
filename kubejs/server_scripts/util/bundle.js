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
 * 预留的收纳袋写入接口，当前尚未实现。
 * @param {Internal.ItemStack[]} stacks
 * @returns {void}
 */
function SetBundleContents(stacks) {
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
 * 按物品及 NBT 分组，记录总数和原始内容索引。
 * @param {Internal.ItemStack} stack
 * @returns {Array<{item: Internal.ItemStack, count: number, indices: number[]}>}
 */
function GetBundleIngredientGroups(stack) {
    let contents = GetBundleContents(stack)
    let groups = []
    for (let i = 0; i < contents.length; i++) {
        let item = contents[i]
        if (item.isEmpty()) continue
        let group = null
        for (let candidate of groups) {
            if ($ItemStack.isSameItemSameTags(candidate.item, item)) {
                group = candidate
                break
            }
        }
        if (!group) {
            group = { item: item.copyWithCount(1), count: 0, indices: [] }
            groups.push(group)
        }
        group.count += item.getCount()
        group.indices.push(i)
    }
    return groups
}


/**
 * 先验证分组快照与数量，再按原始索引扣除材料；失败时不修改内容。
 * @param {Internal.ItemStack} stack
 * @param {Array<{item: Internal.ItemStack, count: number, indices: number[]}>} groups
 * @param {number[]} amounts
 * @returns {boolean}
 */
function ConsumeBundleIngredients(stack, groups, amounts) {
    let contents = GetBundleContents(stack)
    let deductions = []
    for (let i = 0; i < groups.length; i++) {
        let remaining = amounts[i]
        if (remaining == null || remaining < 0 || remaining != Math.floor(remaining)) return false
        for (let index of groups[i].indices) {
            if (remaining == 0) break
            let item = contents[index]
            if (!item || !$ItemStack.isSameItemSameTags(item, groups[i].item)) return false
            let count = Math.min(remaining, item.getCount())
            deductions.push({ index: index, count: count })
            remaining -= count
        }
        if (remaining > 0) return false
    }
    deductions.sort((a, b) => b.index - a.index)
    for (let deduction of deductions) RemoveBundleItem(stack, deduction.index, deduction.count)
    return true
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
