// priority: 500
RegistryOrgan('kubejs:red_wolf_beard')
    .addScore('chestcavity:strength', 1)
    .setCanSpawn(true)

const RedWolfBeardTempSpeedUpUUID = UUID.fromString('C8A46567-E000-48B8-8846-BD2946D4D51F')

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RedWolfBeardEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    let oldDamage = organItem.getDamageValue()
    let attributeInstance = event.entity.getAttribute('minecraft:generic.movement_speed')
    if (oldDamage == organItem.getMaxDamage()) {
        if (attributeInstance.getModifier(RedWolfBeardTempSpeedUpUUID)) {
            attributeInstance.removeModifier(RedWolfBeardTempSpeedUpUUID)
        }
        return
    }

    organItem.setDamageValue(oldDamage + 1)
    if (!attributeInstance.getModifier(RedWolfBeardTempSpeedUpUUID)) {
        let attributeModifier = new $AttributeModifier(RedWolfBeardTempSpeedUpUUID, 'RedWolfBeardTempSpeedUp', 0.5, $Operation.MULTIPLY_BASE)
        attributeInstance.addPermanentModifier(attributeModifier)
    }
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RedWolfBeardTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    let attributeInstance = event.entity.getAttribute('minecraft:generic.movement_speed')
    if (attributeInstance.getModifier(RedWolfBeardTempSpeedUpUUID)) {
        attributeInstance.removeModifier(RedWolfBeardTempSpeedUpUUID)
    }

    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:red_wolf_beard')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RedWolfBeardTakeOn(customData, event, organItem, organIndex, slotType) {
    const { chestCavity, entity } = event
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDeathEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RedWolfBeardEntityKill(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    let damageValue = organItem.getDamageValue()
    if (damageValue == 0 || damageValue == organItem.getMaxDamage()) return
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    if (!sourceEntity.isLiving()) return
    const chestCavity = sourceEntity.chestCavityInstance
    organItem.setDamageValue(damageValue - 3)
    sourceEntity.heal(4)
    sourceEntity.potionEffects.add('minecraft:absorption', 20 * 10, 0)
    if (sourceEntity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function RedWolfBeardKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    organItem.setDamageValue(0)
    player.addItemCooldown('kubejs:red_wolf_beard', 20 * 120)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:red_wolf_beard')
        .addOnlyStrategy('entity_tick', RedWolfBeardEntityTick)
        .addOnlyStrategy('organ_take_off', RedWolfBeardTakeOff)
        .addOnlyStrategy('organ_take_on', RedWolfBeardTakeOn)
        .addOnlyStrategy('entity_kill', RedWolfBeardEntityKill)
        .addOnlyStrategy('key_active', RedWolfBeardKeyActive)
)


