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

function GetCustomDataOrDefault(customData, key, defaultValue) {
    if (!customData[key]) {
        customData[key] = defaultValue
    }
    return customData[key]
}

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
 * 
 * @param {Internal.ChestCavityInstance} cc 
 * @param {*} key 
 * @param {*} defaultValue 
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