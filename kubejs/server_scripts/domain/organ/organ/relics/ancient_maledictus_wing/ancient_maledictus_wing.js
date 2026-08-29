// priority: 500
RegistryOrgan('kubejs:ancient_maledictus_wing')
    .addScore('chestcavity:speed', 2)
    .addScore('kubejs:creative_flight', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AncientMaledictusWingOrganTakeOn(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (entity.isCreative() || entity.isSpectator()) return
    entity.getAbilities().setFlyingSpeed(slotType == AwakeRelicsSlot ? 0.05 : 0.005)
    entity.onUpdateAbilities()
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AncientMaledictusWingOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    entity.getAbilities().setFlyingSpeed(0.05)
    entity.onUpdateAbilities()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ancient_maledictus_wing')
        .addOnlyStrategy('organ_take_on', AncientMaledictusWingOrganTakeOn)
        .addOnlyStrategy('organ_take_off', AncientMaledictusWingOrganTakeOff)
        .addOnlyStrategy('chest_cavity_update', RelicsOrganScoreChestCavityUpdate, 10)
)


