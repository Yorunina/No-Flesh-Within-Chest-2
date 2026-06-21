// priority: 500
RegistryOrgan('kubejs:void_stomach_pouch')
    .addScore('chestcavity:digestion', 2)
    .addScore('chestcavity:nutrition', -0.5)
    .addScore('chestcavity:endurance', -3)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.FoodEatenEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function VoidStomachPouchFoodEaten(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const foodItem = event.item
    const level = event.level
    if (AStages.serverHasStage(FTBFinalTimerStart, event.server)) return
    if (!foodItem) return
    let foodItemId = String(foodItem.id)
    if (!organItem.hasNBT()) organItem.setNbt(new $CompoundTag())
    let nbt = organItem.getNbt()
    if (organItem.getDamageValue() <= 0 && !nbt.getBoolean('start')) nbt.putBoolean('start', true)
    let foodTypeMap = nbt.getCompound('foodTypeMap')
    let eatCount = foodTypeMap.getInt(foodItemId) + 1
    foodTypeMap.putInt(foodItemId, eatCount)
    let comboList = nbt.getList('comboList', TAG_STRING)
    if (comboList.contains(NBT.stringTag(foodItemId))) {
        comboList.clear()
    }
    comboList.add(NBT.stringTag(foodItemId))
    nbt.put('comboList', comboList)
    let statusMsg = Text.translatable('status_msg.kubejs.void_stomach_pouch.item_info', Text.translatable(foodItem.getDescriptionId())).gold()
    let comboCount = comboList.size()
    statusMsg.append(Text.translatable('status_msg.kubejs.void_stomach_pouch.combo_info', comboCount.toFixed(0)).gold())

    let sizeIncr = Math.floor(comboCount / 2)
    if (sizeIncr > 0) {
        nbt.putInt('sizeIncr', nbt.getInt('sizeIncr') + sizeIncr)
        statusMsg.append(Text.translatable('status_msg.kubejs.void_stomach_pouch.size_info', sizeIncr.toFixed(0)).aqua())
    }
    player.setStatusMessage(statusMsg)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'block.amethyst_block.break', player.getSoundSource(), 1, 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function VoidStomachPouchEntityTick(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const player = event.entity
    const level = event.level
    if (!player.isPlayer()) return
    if (!organItem.hasNBT()) return
    let nbt = organItem.getNbt()
    if (!nbt.getBoolean('start')) return
    let curDamage = organItem.getDamageValue() + 1
    if (curDamage >= organItem.getMaxDamage()) {
        if (AStages.serverHasStage(FTBFinalTimerStart, event.server)) return
        let dimNet = DimensionsNet.getPrimaryNetFromPlayer(player)
        if (!dimNet) {
            player.setStatusMessage(Text.translatable('status_msg.kubejs.void_stomach_pouch.no_dimnet'))
            RemoveChestCavityOrgan(customData, event.chestCavity, organIndex, slotType, true)
            return
        }
        let unifiedStorage = dimNet.getUnifiedStorage()
        let sizeIncr = nbt.getInt('sizeIncr')
        unifiedStorage.setSlotMaxSize(unifiedStorage.slotMaxSize + sizeIncr)
        player.setStatusMessage(Text.translatable('status_msg.kubejs.void_stomach_pouch.summary', sizeIncr.toFixed(0)).gold())
        RemoveChestCavityOrgan(customData, event.chestCavity, organIndex, slotType, true)
        // todo 要是有粒子效果会更好，优先级靠后
        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.burp', player.getSoundSource(), 1, 1)
        player.addItemCooldown(organItem, 20 * 300)
    } else {
        organItem.setDamageValue(curDamage)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:void_stomach_pouch')
        .addOnlyStrategy('food_eaten', VoidStomachPouchFoodEaten)
        .addOnlyStrategy('entity_tick', VoidStomachPouchEntityTick)
)