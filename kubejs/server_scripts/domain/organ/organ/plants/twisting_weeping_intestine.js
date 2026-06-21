// priority: 500
RegistryOrgan('kubejs:twisting_weeping_intestine')
    .addScore('chestcavity:nutrition', 1.5)
    .addScore('kubejs:photosynthesis', 0.5)



/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TwistingWeepingIntestineKeyActiveOnly(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    SetCustomDataMap(chestCavity, 'twistingIntestineAttackReady', true)
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex)
    SetOrganEffect(chestCavity, organEffect)
    player.addItemCooldown(organItem, 20 * 30)
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function TwistingWeepingIntestineChestCavityTakeOffOnly(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:twisting_weeping_intestine')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function TwistingWeepingIntestineDoDamage(customData, event, organItem, organIndex, slotType) {
    /** @type {Internal.LivingEntity} */
    const entity = event.source.actual
    const chestCavity = entity.chestCavityInstance
    /** @type {number} */
    let twistingIntestineAttackReady = GetCustomDataMap(chestCavity, 'twistingIntestineAttackReady', false)
    if (!twistingIntestineAttackReady) return
    /** @type {Internal.LivingEntity} */
    const target = event.entity
    if (!target.hasEffect('kubejs:putrid_toxins')) return
    let effect = target.getEffect('kubejs:putrid_toxins')

    let damage = (effect.getAmplifier() * 0.25 + 0.25) * GetPutridToxinsDamage(target) * effect.getDuration() / 40
    event.amount = damage + event.amount
    SetCustomDataMap(chestCavity, 'twistingIntestineAttack', true)
    SetCustomDataMap(chestCavity, 'twistingIntestineAttackReady', false)

    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:twisting_weeping_intestine')
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:twisting_weeping_intestine')
        .addOnlyStrategy('key_active', TwistingWeepingIntestineKeyActiveOnly)
        .addOnlyStrategy('organ_take_off', TwistingWeepingIntestineChestCavityTakeOffOnly)
        .addOnlyStrategy('entity_do_damage', TwistingWeepingIntestineDoDamage)
)

