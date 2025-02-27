// priority: 500
RegistryOrgan('kubejs:furnace_core')
    .addScore('chestcavity:knockback_resistant', 0.5)
    .addScore('chestcavity:health', 2)

RegistryOrgan('kubejs:burning_heart')
    .addScore('chestcavity:knockback_resistant', 0.5)
    .addScore('chestcavity:health', 2)

const FurnaceCoreTempAttackUpUUID = UUID.fromString('858D6175-7E75-41BC-9E70-A42AAFE7A337')
/**
 * @param {any} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreEntityTick(customData, event, organItem, organIndex, slotType) {
    let attributeInstance = event.entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    if (organItem.getDamageValue() + 1 <= organItem.getMaxDamage()) {
        organItem.setDamageValue(organItem.getDamageValue() + 1)
        let value = 1
        let oldModifier = attributeInstance.getModifier(FurnaceCoreTempAttackUpUUID)
        if (oldModifier) value = oldModifier.amount + value

        let attributeModifier = new $AttributeModifier(FurnaceCoreTempAttackUpUUID, 'FurnaceCoreTempAttackUp', value, $Operation.ADDITION)

        attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
        attributeInstance.addTransientModifier(attributeModifier)
    } else {
        let value = -1
        let oldModifier = attributeInstance.getModifier(FurnaceCoreTempAttackUpUUID)
        if (oldModifier) value = oldModifier.amount + value

        attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
        if (value <= 0) return
        let attributeModifier = new $AttributeModifier(FurnaceCoreTempAttackUpUUID, 'FurnaceCoreTempAttackUp', value, $Operation.ADDITION)
        attributeInstance.addTransientModifier(attributeModifier)
    }
}

/**
 * @param {any} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    if (!sourceEntity.isAlive()) return
    if (organItem.getDamageValue() > 3) {
        organItem.setDamageValue(organItem.getDamageValue() - 3)
    } else {
        SetOrganWithoutUpdate(customData, sourceEntity.chestCavityInstance, Item.of('kubejs:burning_heart'), organIndex, slotType)
    }
}


/**
 * @param {any} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    let attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
}




RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:furnace_core')
        .addOnlyStrategy('entity_tick', FurnaceCoreEntityTick)
        .addOnlyStrategy('organ_take_off', FurnaceCoreTakeOff)
        .addOnlyStrategy('entity_do_damage', FurnaceCoreDoDamage)
)

/**
 * @param {any} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningCoreEntityTick(customData, event, organItem, organIndex, slotType) {
    let attributeInstance = event.entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    if (organItem.getDamageValue() + 5 <= organItem.getMaxDamage()) {
        organItem.setDamageValue(organItem.getDamageValue() + 5)
    } else {
        let replaceItem = Item.of('kubejs:furnace_core')
        replaceItem.setDamageValue(100)
        SetOrganWithoutUpdate(customData, event.chestCavity, replaceItem, organIndex, slotType)
    }
}


/**
 * @param {any} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningCoreDoDamage(customData, event, organItem, organIndex, slotType) {
    event.amount = event.amount * 2
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:burning_heart')
        .addOnlyStrategy('entity_tick', BurningCoreEntityTick)
        .addOnlyStrategy('organ_take_off', FurnaceCoreTakeOff)
        .addOnlyStrategy('entity_do_damage', BurningCoreDoDamage)
)




