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

function GetTreaseMapItem(level, pos) {
    let mapItem = $MapItem.create(level, pos.x, pos.z, 1, true, true)
    $MapItem.renderBiomePreviewMap(level, mapItem)
    $MapItemSavedData.addTargetDecoration(mapItem, pos, "+", $MapDecorationType.RED_X)
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
    let itemChunks = SliceChunkArray(lootList, 3)
    let tickCounter = 5
    itemChunks.forEach(itemChunk => {
        level.server.scheduleInTicks(tickCounter, callback => {
            itemChunk.forEach(item => {
                $Containers.dropItemStack(level, blockPos.x, blockPos.y, blockPos.z, item.copy())
            })
        })
        tickCounter = tickCounter + 10
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
        TetraJS$ItemModularHandheld.getAttackSpeedHarvestModifier(
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
        entity.getGameProfile()
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
 * 
 * @param {Player} player
 * @param {string} curiosId 
 * @returns 
 */
function IncrMiracleCuriosCounter(player, curiosId) {
    let curiosItemHandler = GetCuriosInventoryCap(player)
    let miracleStackOpt = curiosItemHandler.getStacksHandler('miracle')
    if (!miracleStackOpt.isPresent()) return
    let miracleStackHandler = miracleStackOpt.get()
    let miraclelStacks = miracleStackHandler.getStacks()
    if (miraclelStacks.getSlots() <= 0) return
    miraclelStacks.allItems.forEach(pItem => {
        if (!pItem.is(curiosId)) return
        let nbt = pItem.getOrCreateTag()
        nbt.putInt('value', nbt.getInt('value') + 1)
        pItem.setNbt(nbt)
    })
}