// priority: 500
RegistryOrgan('kubejs:maledictus_wing')
    .addScore('chestcavity:speed', 2)
    .addScore('chestcavity:strength', 1)
/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function MaledictusWingOrganTakeOn(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (entity.isCreative() || entity.isSpectator()) return
    entity.getAbilities().mayfly = true
    entity.getAbilities().setFlyingSpeed(slotType == AwakeRelicSlot ? 0.05 : 0.005)
    entity.onUpdateAbilities()
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function MaledictusWingOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    entity.getAbilities().mayfly = true

    if (!entity.isCreative() && !entity.isSpectator()) {
        entity.getAbilities().flying = false
        entity.getAbilities().mayfly = false
    }
    entity.getAbilities().setFlyingSpeed(0.05)
    entity.onUpdateAbilities()
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:maledictus_wing')
        .addOnlyStrategy('organ_take_on', MaledictusWingOrganTakeOn)
        .addOnlyStrategy('organ_take_off', MaledictusWingOrganTakeOff)
)


