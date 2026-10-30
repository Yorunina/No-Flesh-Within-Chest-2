// priority: 500

RegistryOrgan('kubejs:recovery_spleen')
    .addScore('chestcavity:metabolism', 1)

/**
 * 处理器官事件：entity_be_hurt。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function recoverySpleenEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    let targetType = String(entity.getType())
    let damage = getRecoverySpleenHealing(targetType)
    entity.heal(damage)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:recovery_spleen')
        .addOnlyStrategy('entity_be_hurt', recoverySpleenEntityBeHurt)
)

const recoverySpleenHealingMap = new Map()
/**
 *
 * @param {String} entityTypeId
 * @param {number} damage
 */
function registerRecoverySpleenHealing(entityTypeId, damage) {
    recoverySpleenHealingMap.set(entityTypeId, damage)
}
/**
 * 按实体类型读取恢复脾脏的治疗量。
 * @param {string} entityType
 * @returns {number}
 */
function getRecoverySpleenHealing(entityType) {
    let targetType = String(entityType)
    return recoverySpleenHealingMap.has(targetType) ? recoverySpleenHealingMap.get(targetType) : recoverySpleenHealingMap.get('default')
}

registerRecoverySpleenHealing('default', 2)
registerRecoverySpleenHealing('minecraft:bee', 4)
registerRecoverySpleenHealing('minecraft:panda', 4)
registerRecoverySpleenHealing('minecraft:frog', 4)
registerRecoverySpleenHealing('minecraft:bat', 4)
registerRecoverySpleenHealing('minecraft:glow_squid', 4)
registerRecoverySpleenHealing('minecraft:ghast', 6)
registerRecoverySpleenHealing('minecraft:axolotl', 6)
registerRecoverySpleenHealing('minecraft:shulker', 4)
registerRecoverySpleenHealing('minecraft:polar_bear', 4)
registerRecoverySpleenHealing('minecraft:ravager', 4)
registerRecoverySpleenHealing('minecraft:zoglin', 4)
registerRecoverySpleenHealing('minecraft:strider', 4)
registerRecoverySpleenHealing('minecraft:dolphin', 4)
registerRecoverySpleenHealing('minecraft:fox', 4)
registerRecoverySpleenHealing('minecraft:horse', 4)
registerRecoverySpleenHealing('minecraft:donkey', 4)
registerRecoverySpleenHealing('minecraft:mule', 4)
registerRecoverySpleenHealing('minecraft:llama', 4)
registerRecoverySpleenHealing('minecraft:trader_llama', 4)
registerRecoverySpleenHealing('minecraft:ocelot', 4)
registerRecoverySpleenHealing('minecraft:turtle', 4)
registerRecoverySpleenHealing('minecraft:squid', 4)
registerRecoverySpleenHealing('minecraft:pufferfish', 4)
registerRecoverySpleenHealing('minecraft:zombified_piglin', 15)
registerRecoverySpleenHealing('minecraft:drowned', 15)
registerRecoverySpleenHealing('minecraft:magma_cube', 1)
registerRecoverySpleenHealing('minecraft:villager', 15)
registerRecoverySpleenHealing('minecraft:ender_dragon', 10)
registerRecoverySpleenHealing('dracolotl:dracolotl', 2)
registerRecoverySpleenHealing('biomancy:flesh_blob', 4)
registerRecoverySpleenHealing('biomancy:primordial_flesh_blob', 4)
registerRecoverySpleenHealing('biomancy:hungry_flesh_blob', 4)
registerRecoverySpleenHealing('biomancy:legacy_flesh_blob', 4)
registerRecoverySpleenHealing('biomancy:primordial_hungry_flesh_blob', 4)
