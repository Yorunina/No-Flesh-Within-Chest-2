// priority: 3000

/**
 * 
 * @param {Internal.LivingEntity} entity 
 * @returns {Internal.ChestCavityInventory}
 */
function GetEntityChestCavityInventory(entity) {
    return entity.chestCavityInstance.inventory
}

/**
 * 
 * @param {Internal.ChestCavityInstance} cc 
 * @param {Number} index 
 */
function GetChestCavitySlotType(cc, index) {
    return cc.getInventoryTypeData().getSlotType(index)
}

/**
 * 读取事件共享数据；值为假值时写入并返回默认值。
 * @template T
 * @param {Object<string, any>} customData
 * @param {string} key
 * @param {T} defaultValue
 * @returns {T}
 */
function GetCustomDataOrDefault(customData, key, defaultValue) {
    if (!customData[key]) {
        customData[key] = defaultValue
    }
    return customData[key]
}

/**
 * 写入事件共享数据。
 * @param {Object<string, any>} customData
 * @param {string} key
 * @param {*} value
 * @returns {void}
 */
function SetCustomData(customData, key, value) {
    customData[key] = value
}

/**
 * 
 * @param {Internal.ChestCavityInstance} cc 
 * @param {*} key 
 * @param {*} value 
 */
function SetCustomDataMap(cc, key, value) {
    cc.customDataMap.put(key, value)
}

/**
 * 读取胸腔实例数据，不存在时返回默认值。
 * @template T
 * @param {Internal.ChestCavityInstance} cc
 * @param {string} key
 * @param {T} defaultValue
 * @returns {T}
 */
function GetCustomDataMap(cc, key, defaultValue) {
    return cc.customDataMap.getOrDefault(key, defaultValue)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} cc 
 * @param {*} key 
 */
function RemoveCustomDataMap(cc, key) {
    cc.customDataMap.remove(key)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {number} damage 
 */
function SetPutridToxinsDamage(target, damage) {
    target.getPersistentData().putFloat('putridToxinsDamage', damage)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns {number}
 */
function GetPutridToxinsDamage(target) {
    return target.getPersistentData().getFloat('putridToxinsDamage')
}


/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns {number}
 */
function ResetPutridToxins(target) {
    return target.getPersistentData().remove('putridToxinsDamage')
}


/**
 * 
 * @param {Internal.LivingEntity} target 
 */
function ResetVitaToxins(target) {
    target.getPersistentData().remove('vitaToxinsSource')
    target.getPersistentData().remove('vitaToxinsType')
    target.getPersistentData().remove('vitaToxinsCoe')
}


/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {Internal.UUID} uuid
 */
function SetVitaToxinsSource(target, uuid) {
    target.getPersistentData().putUUID('vitaToxinsSource', uuid)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @return {Internal.UUID}
 */
function GetVitaToxinsSource(target) {
    return target.getPersistentData().contains('vitaToxinsSource') ? target.getPersistentData().getUUID('vitaToxinsSource') : null
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @param {string} type
 */
function SetVitaToxinsType(target, type) {
    target.getPersistentData().putString('vitaToxinsType', type)
}

/**
 * 
 * @param {Internal.LivingEntity} target 
 * @returns 
 */
function GetVitaToxinsType(target) {
    return target.getPersistentData().contains('vitaToxinsType') ? target.getPersistentData().getString('vitaToxinsType') : 'attack_damage'
}

/**
 *
 * @param {Internal.LivingEntity} target
 * @param {number} coe
 */
function SetVitaToxinsCoe(target, coe) {
    target.getPersistentData().putFloat('vitaToxinsCoe', coe)
}

/**
 * @param {Internal.LivingEntity} target
 * @returns {number}
 */
function GetVitaToxinsCoe(target) {
    return target.getPersistentData().getFloat('vitaToxinsCoe')
}


/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.ServerPlayer} player 
 */
function CommonDingNotice(level, player) {
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.experience_orb.pickup', player.getSoundSource(), 3, 1)
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.ItemStack} item 
 * @returns {Boolean}
 */
function OrganItemCoolDown(player, item) {
    const cooldowns = player.getCooldowns()
    if (cooldowns.isOnCooldown(item)) {
        let cooldownInstance = cooldowns.cooldowns.getOrDefault(item.getItem(), null)
        if (!cooldownInstance) return false
        let endTime = cooldownInstance.endTime
        let leftTime = endTime - cooldowns.tickCount
        player.setStatusMessage(Text.translatable('status_msg.kubejs.key_active.cooldown', Text.gold(item.getHoverName()), leftTime / 20))
        return true
    }
    return false
}


/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.ItemStack} item 
 * @returns {Boolean}
 */
function OrganItemCoolDownSlience(player, item) {
    const cooldowns = player.getCooldowns()
    if (cooldowns.isOnCooldown(item)) {
        return true
    }
    return false
}



/**
 * 
 * @param {Internal.InventoryTypeData} invTypeData 
 * @param {number} organIndex 
 * @param {number[][]} directionSet `
 * @returns {Internal.ChestCavitySlotDefinition[]}
 */
function GetDirectionRelativeSlotByParam(invTypeData, organIndex, directionSet) {
    let curRelativePosition = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let relativeSlots = []
    for (let [offsetX, offsetY] of directionSet) {
        let slotDefinition = invTypeData.getRelativeSlotDefinition(curRelativePosition.getX() + offsetX, curRelativePosition.getY() + offsetY)
        if (!slotDefinition) continue
        relativeSlots.push(slotDefinition)
    }
    return relativeSlots
}

/**
 * 将产物写入目标槽或合并至已有堆叠；调用前须验证容量。
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} chestCavity
 * @param {Internal.ItemStack} outputItem
 * @param {number} targetIndex
 * @param {boolean} updateEmpty
 * @returns {void}
 */
function SetChestCavityOutput(customData, chestCavity, outputItem, targetIndex, updateEmpty) {
    let existingItem = chestCavity.inventory.getStackInSlot(targetIndex)
    let output = outputItem.copy()
    let update = updateEmpty
    if (!existingItem.isEmpty()) {
        output = existingItem.copy()
        output.setCount(existingItem.getCount() + outputItem.getCount())
        update = false
    }
    let slotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetChestCavityOrgan(customData, chestCavity, output, targetIndex, slotType, update)
}

const ItemDirectionOffsets = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
]

/**
 * 按物品保存的方向查找相邻槽，并将无效方向归零。
 * @param {Internal.InventoryTypeData} invTypeData
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @returns {Internal.ChestCavitySlotDefinition[]}
 */
function GetItemDirectionSlots(invTypeData, organItem, organIndex) {
    let nbt = organItem.getOrCreateTag()
    let state = nbt.getInt('direction_state')
    if (state < 0 || state >= ItemDirectionOffsets.length) {
        state = 0
        nbt.putInt('direction_state', state)
    }
    return GetDirectionRelativeSlotByParam(invTypeData, organIndex, [ItemDirectionOffsets[state]])
}
