// priority: 500
RegistryOrgan('kubejs:blaze_spine')
    .addScore('chestcavity:nerves', 1)
    .addScore('kubejs:crit_chance', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BlazeSpineEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const source = event.source.actual
    const chestCavity = source.chestCavityInstance
    /**@type {number} */
    let blazeSpineCounter = GetCustomDataMap(chestCavity, 'blazeSpineCounter', 0)
    if (blazeSpineCounter <= 0) return
    blazeSpineCounter = blazeSpineCounter - 1
    const target = event.entity
    let fireTicks = Math.max(source.getRemainingFireTicks() - 60, 0)
    source.setRemainingFireTicks(fireTicks)
    target.setRemainingFireTicks(fireTicks)
    if (slotType == MachinaryLubricant) return
    SetCustomDataMap(chestCavity, 'blazeSpineCounter', blazeSpineCounter)
    if (blazeSpineCounter > 0) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText(blazeSpineCounter.toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    } else {
        RemoveOrganEffect(chestCavity, 'kubejs:blaze_spine')
    }
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BlazeSpineKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    SetCustomDataMap(chestCavity, 'blazeSpineCounter', 1)
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText('1')
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown(organItem, 20 * 10)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BlazeSpineOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity.isPlayer()) {
        RemoveOrganEffect(chestCavity, 'kubejs:blaze_spine')
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blaze_spine')
        .addOnlyStrategy('entity_do_damage', BlazeSpineEntityDoDamage)
        .addOnlyStrategy('key_active', BlazeSpineKeyActiveOnly)
        .addOnlyStrategy('organ_take_off', BlazeSpineOrganTakeOff)
)