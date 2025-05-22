// priority: 500
RegistryOrgan('kubejs:infinity_beats')
    .addScore('chestcavity:health', -2)
    .addScore('chestcavity:defense', -2)
    .addScore('chestcavity:breath_recovery', -2)

RegistryOrgan('kubejs:infinity_force')
    .addScore('chestcavity:health', -2)
    .addScore('chestcavity:defense', -2)
    .addScore('chestcavity:breath_recovery', -2)


/** ============================================================== */

const InfinityBeatsTempAttackUpUUID = UUID.fromString('686F8285-3FBF-4A22-9F2A-B1D6BA452BA8')
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfinityBeatsEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    if (!sourceEntity.isAlive()) return
    if (sourceEntity.hasItemInSlot('mainhand') || sourceEntity.hasItemInSlot('offhand')) return
    let value = 4
    let attributeInstance = sourceEntity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    let oldModifier = attributeInstance.getModifier(InfinityBeatsTempAttackUpUUID)
    if (oldModifier) {
        value = oldModifier.amount + value
    }
    let attributeModifier = new $AttributeModifier(InfinityBeatsTempAttackUpUUID, 'InfinityBeatsTempAttackUp', value, $Operation.ADDITION)

    attributeInstance.removeModifier(InfinityBeatsTempAttackUpUUID)
    attributeInstance.addPermanentModifier(attributeModifier)

    customData.thornsDamage = Math.floor(value / 4)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfinityBeatsTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    let attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(InfinityBeatsTempAttackUpUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:infinity_beats')
        .addOnlyStrategy('entity_do_damage', InfinityBeatsEntityDoDamage)
        .addOnlyStrategy('organ_take_off', InfinityBeatsTakeOff)
)


/** ============================================================== */


/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfinityForceChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    if (!organItem.hasNBT() || !organItem.nbt.contains('forgeTimes')) return
    let value = organItem.nbt.getInt('forgeTimes')
    customData.attackDamage.addAttributeModifier(value, 'addition', 'base')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LootContextJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfinityForceEntityLoot(customData, event, organItem, organIndex, slotType) {
    if (Math.random() > Math.max(0.03 * event.killerEntity.getLuck(), 0.03)) {
        return
    }
    if (BossEntityTypeList.some(ele => ele == event.entity.getType())) {
        let forgeTimes = 0
        if (organItem.hasNBT() && organItem.nbt.contains('forgeTimes')) {
            forgeTimes = organItem.nbt.getInt('forgeTimes')
        }
        
        event.addLoot(Item.of('kubejs:infinity_force', { forgeTimes: Math.floor(Math.random() * forgeTimes) }))
    }
}
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:infinity_force')
        .addStrategy('chest_cavity_update', InfinityForceChestCavityUpdate)
        .addOnlyStrategy('entity_loot', InfinityForceEntityLoot)
)

/** ============================================================== */