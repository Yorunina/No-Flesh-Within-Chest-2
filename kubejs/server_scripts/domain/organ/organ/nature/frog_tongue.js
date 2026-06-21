// priority: 500
RegistryOrgan('kubejs:frog_tongue')
    .addScore('chestcavity:strength', 1.5)
    .addScore('chestcavity:knockback_resistant', 0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FrogTongueKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    SetCustomDataMap(chestCavity, 'frogTongueEffectReady', 1)
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex)
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown(organItem, 20 * 60)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FrogTongueChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:frog_tongue')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ItemEntityInteractedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FrogTongueEntityInteract(customData, event, organItem, organIndex, slotType) {
    const target = event.target
    const player = event.player
    const level = event.level
    if (event.hand != 'main_hand') return
    if (!player.mainHandItem.isEmpty()) return

    const playerCC = player.chestCavityInstance
    let counter = GetCustomDataMap(playerCC, 'frogTongueEffectReady', 0)
    if (counter == 0) return

    if (playerCC.inventory.countEmpty() == 0) return
    if (!(target instanceof $LivingEntity)) return

    let targetCC = target.chestCavityInstance
    let ccInv = targetCC.inventory
    if (!targetCC.opened) {
        ccInv = ChestCavityUtils.openChestCavity(targetCC)
    }
    /**@type {number[]} */
    let validSlotIds = []
    for (let i = 0; i < ccInv.getContainerSize(); i++) {
        if (ccInv.getItem(i).isEmpty()) continue
        validSlotIds.push(i)
    }
    if (validSlotIds.length == 0) return
    /**@type {number} */
    let randomSlotId = RandomGet(validSlotIds)
    let extractedItem = ccInv.extractItem(randomSlotId, 1, false)
    playerCC.inventory.insertItem(extractedItem, false)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.item.pickup', player.getSoundSource(), 1, 1)
    
    SetCustomDataMap(playerCC, 'frogTongueEffectReady', counter - 1)
    RemoveOrganEffect(playerCC, 'kubejs:frog_tongue')
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:frog_tongue')
        .addOnlyStrategy('key_active', FrogTongueKeyActive)
        .addOnlyStrategy('organ_take_off', FrogTongueChestCavityTakeOffOnly)
        .addOnlyStrategy('entity_interact', FrogTongueEntityInteract)
)