// priority: 500
RegistryOrgan('kubejs:fiery_core')
    .addScore('chestcavity:health', 0.5)
    .addScore('chestcavity:defense', -1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FieryCoreOrganTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.setNoFireDamage(true)
    if (entity.isPlayer()) {
        let data = new $CompoundTag()
        data.putBoolean('noFireRender', true)
        EnqueueSendData(entity, 'fire_render', data)
    }
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FieryCoreOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.setNoFireDamage(false)
    if (entity.isPlayer()) {
        let data = new $CompoundTag()
        data.putBoolean('noFireRender', false)
        EnqueueSendData(entity, 'fire_render', data)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:fiery_core')
        .addOnlyStrategy('organ_take_on', FieryCoreOrganTakeOn)
        .addOnlyStrategy('organ_take_off', FieryCoreOrganTakeOff)
)