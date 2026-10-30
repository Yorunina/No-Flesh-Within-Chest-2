// priority: 3000
/**
 * 
 * @param {Internal.CompoundTag} data 
 */
function DeserializeItemFromNbt(data) {
    let id = data.getString('id')
    let count = data.getInt('Count')
    let nbt = data.getCompound('tag')
    if (!id) {
        return null
    }
    let res = Item.of(id, count)
    if (nbt) {
        res.setNbt(nbt)
    }
    return res
}

/**
 * 创建标记指定坐标的藏宝图。
 * @param {Internal.ServerLevel} level
 * @param {Internal.BlockPos} pos
 * @returns {Internal.ItemStack}
 */
function GetTreaseMapItem(level, pos) {
    let mapItem = $MapItem.create(level, pos.x, pos.z, 1, true, true)
    $MapItem.renderBiomePreviewMap(level, mapItem)
    $MapItemSavedData.addTargetDecoration(mapItem, pos, '+', $MapDecorationType.RED_X)
    return mapItem
}

/**
 * 
 * @param {ResourceLocation} lootId 
 * @returns {Internal.LootTable}
 */
function GetLootTable(lootId) {
    const lootData = Utils.server.getLootData()
    return lootData.getLootTable(lootId)
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {BlockPos} blockPos 
 * @param {Internal.ItemStack[]} lootList 
 */
function SpawnLootAtLocation(level, blockPos, lootList) {
    /**@type {Internal.ItemStack[][]} */
    let itemChunks = SliceChunkArray(lootList, 10)
    let tickCounter = 3
    itemChunks.forEach(itemChunk => {
        level.server.scheduleInTicks(tickCounter, callback => {
            itemChunk.forEach(item => {
                $Containers.dropItemStack(level, blockPos.x, blockPos.y, blockPos.z, item.copy())
            })
        })
        tickCounter = tickCounter + 3
    })
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {Vec3d} pos 
 * @param {Internal.ItemStack[]} lootList 
 */
function SpawnLootAtVec3(level, pos, lootList) {
    /**@type {Internal.ItemStack[][]} */
    let itemChunks = SliceChunkArray(lootList, 10)
    let tickCounter = 3
    itemChunks.forEach(itemChunk => {
        level.server.scheduleInTicks(tickCounter, callback => {
            itemChunk.forEach(item => {
                $Containers.dropItemStack(level, pos.x(), pos.y(), pos.z(), item.copy())
            })
        })
        tickCounter = tickCounter + 3
    })
}


/**
 * 
 * @param {Internal.ItemStack} item
 */
function DamageItem(item) {
    let damageValue = item.getDamageValue()
    let maxDamage = item.getMaxDamage()
    if (maxDamage == 0 || damageValue + 1 >= maxDamage) {
        item.setCount(0)
    } else {
        item.setDamageValue(damageValue + 1)
    }
}

/**
 * 
 * @param {Internal.ItemStack} sourceJarItem 
 * @param {number} count 
 * @returns 
 */
function SourceJarItemAddSource(sourceJarItem, count) {
    if (!sourceJarItem.hasNBT()) sourceJarItem.setNbt(NBT.fromTag({ BlockEntityTag: { source: 0 } }))
    let nbt = sourceJarItem.getNbt()
    if (!nbt.contains('BlockEntityTag')) nbt.put('BlockEntityTag', new $CompoundTag())
    let blockEntityNbt = nbt.getCompound('BlockEntityTag')
    let sourceCount = blockEntityNbt.contains('source') ? blockEntityNbt.getInt('source') : 0
    blockEntityNbt.putInt('source', Math.min(sourceCount + count, SourceJarMax))
    sourceJarItem.setNbt(nbt)
}

/**
 * 
 * @param {Internal.ItemStack} sourceJarItem 
 * @param {number} count 
 * @returns {boolean}
 */
function SourceJarItemConsumeSource(sourceJarItem, count) {
    if (!sourceJarItem.hasNBT()) return false
    let nbt = sourceJarItem.getNbt()
    if (!nbt.contains('BlockEntityTag')) return false
    let blockEntityNbt = nbt.getCompound('BlockEntityTag')
    if (!blockEntityNbt.contains('source')) return false
    let sourceCount = blockEntityNbt.getInt('source')
    if (sourceCount < count) return false
    blockEntityNbt.putInt('source', sourceCount - count)
    sourceJarItem.setNbt(nbt)
    return true
}

/**
 * 
 * @param {Internal.ItemStack[]} itemList 
 * @param {Internal.ItemStack} item 
 */
function AddItemStackToItemStackList(itemList, item) {
    if (item.isEmpty()) return
    for (let i = 0; i < itemList.length; i++) {
        let pItemStack = itemList[i]
        if (item.isEmpty()) return

        if ($ItemStack.isSameItemSameTags(pItemStack, item)) {
            if (pItemStack.getCount() + item.getCount() > pItemStack.getMaxStackSize()) {
                let overflowCount = pItemStack.getMaxStackSize() - pItemStack.getCount()
                pItemStack.setCount(pItemStack.getMaxStackSize())
                item.setCount(item.getCount() - overflowCount)
            } else {
                pItemStack.setCount(pItemStack.getCount() + item.getCount())
            }
        }
    }
    if (!item.isEmpty()) {
        itemList.push(item)
    }
}

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {Internal.FluidHandlerItemStack}
 */
function GetItemFluidHandler(stack) {
    let item = stack.getItem()
    if (item instanceof $FueledToolItem) {
        return item.getFluidHandler(stack)
    }
}

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns {number}
 */
function GetModularItemMineSpeed(stack) {
    return Math.round(
        TetraItemModularHandheld.getAttackSpeedHarvestModifier(
            stack.getItem().getAttributeValue(stack, 'minecraft:generic.attack_speed', 4.0)) *
        stack.getItem().getToolData(stack).getEfficiency($ToolAction.get('pickaxe_dig'))
    )
}

/**
 * @param {Internal.LivingEntity} entity 
 * @returns {Internal.ItemStack}
 */
function GetEntityHeadItem(entity) {
    if (entity.isPlayer()) {
        return Item.of('minecraft:player_head', $NbtUtils.writeGameProfile(new $CompoundTag(), entity.getGameProfile()))
    } else if (Entity2EntityHeadItem[entity.getType()]) {
        return Entity2EntityHeadItem[entity.getType()]
    }
    return null
}

/**
 * @param {string} playerName 
 * @returns {Internal.ItemStack}
 */
function GetPlayerHeadItem(playerName) {
    let nbt = new $CompoundTag()
    nbt.putString('SkullOwner', playerName)
    return Item.of('minecraft:player_head', nbt)
}

/**
 * 按增量调整器官损伤；超过最大损伤时不写入。
 * @param {Internal.ItemStack} organItem
 * @param {number} amount
 * @returns {void}
 */
function ChangeItemDamage(organItem, amount) {
    let damage = organItem.getDamageValue() + amount
    if (damage <= organItem.getMaxDamage()) organItem.setDamageValue(damage)
}

/**
 * 检查产物能否完整放入目标堆叠，同时遵守物品与槽位上限。
 * @param {Internal.ItemStack} existingItem
 * @param {Internal.ItemStack | null} outputItem
 * @param {number} [slotLimit]
 * @returns {boolean}
 */
function CanMergeItemStacks(existingItem, outputItem, slotLimit) {
    if (!outputItem || outputItem.isEmpty()) return false
    let limit = outputItem.getMaxStackSize()
    if (slotLimit != null) limit = Math.min(limit, slotLimit)
    if (existingItem.isEmpty()) return outputItem.getCount() <= limit
    return $ItemStack.isSameItemSameTags(existingItem, outputItem)
        && existingItem.getCount() + outputItem.getCount() <= Math.min(limit, existingItem.getMaxStackSize())
}

/**
 * 按顺序查找 Create 加工配方，每次调用重新抽取随机产物。
 * @param {Internal.Level} level
 * @param {Internal.ItemStack} inputItem
 * @param {Internal.AllRecipeTypes[]} recipeTypes
 * @param {object | null} [scope]
 * @param {number | string} [position]
 * @returns {Internal.ItemStack[]}
 */
function GetProcessingRecipeResults(level, inputItem, recipeTypes, scope, position) {
    let findRecipe = () => {
        let inventory = new $ProcessingInventory(ctx => {})
        inventory.insertItem(inputItem, false)
        let wrapper = new $RecipeWrapper(inventory)
        for (let recipeType of recipeTypes) {
            let recipe = recipeType.find(wrapper, level)
            if (recipe.isPresent()) return recipe.get()
        }
        return null
    }
    let recipe = scope
        ? GetCachedNativeRecipe(scope, position, 'create|' + recipeTypes.join('|') + '|' + String(level.dimension), inputItem, findRecipe)
        : findRecipe()
    let results = []
    if (recipe) for (let output of recipe.rollResults()) results.push(output)
    return results
}

/**
 * 复制产物并按倍数调整数量，保留原始堆叠。
 * @param {Internal.ItemStack[]} outputs
 * @param {number} count
 * @returns {Internal.ItemStack[]}
 */
function ScaleItemOutputs(outputs, count) {
    let result = []
    for (let output of outputs) {
        let stack = output.copy()
        stack.setCount(output.getCount() * count)
        result.push(stack)
    }
    return result
}

/**
 * 读取匹配 Tetra 增益键的等级，未找到时返回 0。
 * @param {Internal.ItemStack | null} stack
 * @param {string} improvementKey
 * @returns {number}
 */
function GetImprovementLevel(stack, improvementKey) {
    if (!stack || !stack.hasNBT()) return 0
    let level = 0
    stack.getNbt()
        .getAllKeys()
        .forEach(key => {
            if (key.endsWith(':' + improvementKey)) level = stack.getNbt().getInt(key)
        })
    return level
}

/**
 * 循环切换物品 NBT 中保存的四向状态。
 * @param {Internal.ItemClickedEventJS} event
 * @returns {void}
 */
function CycleItemDirection(event) {
    let nbt = event.item.getOrCreateTag()
    let state = Math.max(0, Math.min(4 - 1, nbt.getInt('direction_state')))
    nbt.putInt('direction_state', (state + 1) % 4)
}
