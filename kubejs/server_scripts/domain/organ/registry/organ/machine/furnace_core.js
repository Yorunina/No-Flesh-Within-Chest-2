// priority: 500
RegistryOrgan('kubejs:furnace_core')
    .addScore('chestcavity:knockback_resistant', 0.5)
    .addScore('chestcavity:strength', -3)
    .addScore('chestcavity:health', 1.5)

RegistryOrgan('kubejs:burning_heart')
    .addScore('chestcavity:knockback_resistant', 0.5)
    .addScore('chestcavity:strength', -3)
    .addScore('chestcavity:health', 1.5)

const FurnaceCoreTempAttackUpUUID = UUID.fromString('858D6175-7E75-41BC-9E70-A42AAFE7A337')
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreEntityTickDefer(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    let attributeInstance = event.entity.getAttribute('minecraft:generic.attack_damage')
    /**@type {number} */
    let value = 0
    if (!attributeInstance) return
    if (organItem.getDamageValue() + 1 <= organItem.getMaxDamage()) {
        organItem.setDamageValue(organItem.getDamageValue() + 1)
        value = 1
        let oldModifier = attributeInstance.getModifier(FurnaceCoreTempAttackUpUUID)
        if (oldModifier) value = oldModifier.amount + value
        if (slotType != RevolutionFlame) value = Math.min(value, 300)

        let attributeModifier = new $AttributeModifier(FurnaceCoreTempAttackUpUUID, 'FurnaceCoreTempAttackUp', value, $Operation.ADDITION)

        attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
        attributeInstance.addPermanentModifier(attributeModifier)
    } else {
        value = -3
        let oldModifier = attributeInstance.getModifier(FurnaceCoreTempAttackUpUUID)
        if (oldModifier) value = Math.max(oldModifier.amount + value, 0)

        attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
        if (value <= 0) return
        let attributeModifier = new $AttributeModifier(FurnaceCoreTempAttackUpUUID, 'FurnaceCoreTempAttackUp', value, $Operation.ADDITION)
        attributeInstance.addPermanentModifier(attributeModifier)
    }
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    let damageValue = 2 + GetCustomDataMap(chestCavity, 'furnaceCoreRelay', 0)
    // 烈焰槽位解除耐久消耗提升限制
    if (slotType != RevolutionFlame) {
        damageValue = Math.min(damageValue, 5)
    }
    if (organItem.getDamageValue() > damageValue) {
        organItem.setDamageValue(organItem.getDamageValue() - damageValue)
        if (sourceEntity instanceof $ServerPlayer) {
            let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
            SetOrganEffect(chestCavity, organEffect)
        }
    } else {
        // 熔火 -> 心火
        let replaceItem = Item.of('kubejs:burning_heart')
        SetChestCavityOrgan(customData, chestCavity, replaceItem, organIndex, slotType, false)
        // 革命之钟触发烈焰加压器
        if (chestCavity.inventory.find('kubejs:revolution_bell') > 0) {
            if (sourceEntity instanceof $ServerPlayer) {
                if (!sourceEntity.getCooldowns().isOnCooldown('kubejs:blaze_pressurizer')) {
                    let counter = BlazePressurizerActive(chestCavity, slotType)
                    let organEffect = new OragnEffectModel(Item.of('kubejs:blaze_pressurizer')).setPriority(organIndex).setCustomText(counter.toFixed(0))
                    SetOrganEffect(chestCavity, organEffect)
                    sourceEntity.addItemCooldown('kubejs:blaze_pressurizer', 20 * 30)
                }
            } else {
                // 非玩家直接触发
                BlazePressurizerActive(chestCavity, slotType)
            }
        }

        if (sourceEntity instanceof $ServerPlayer) {
            let organEffect = new OragnEffectModel(replaceItem).setPriority(organIndex).setCustomText((replaceItem.getMaxDamage() - replaceItem.getDamageValue()).toFixed(0))
            SetOrganEffect(chestCavity, organEffect)
            RemoveOrganEffect(chestCavity, 'kubejs:furnace_core')
            CommonDingNotice(sourceEntity.level, sourceEntity)
        }
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    let attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:furnace_core')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function FurnaceCoreTakeOn(customData, event, organItem, organIndex, slotType) {
    const { chestCavity, entity } = event
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}
/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function BurningHeartMpmTakeOn(customData, event, organItem, organIndex, slotType) {
    switch (GetOrganItemMPMType(organItem)) {
        case OrganItemMPMTypeShow: {
            let bodyPartId = 'kubejs:parts/body/burning_heart_body_model.json'
            let armPartId = 'kubejs:parts/arms/burning_heart_arm_model.json'
            let bodyIndex = customData.modelData.mpmParts.findIndex(mpmData => mpmData.partId.toString() == bodyPartId)
            if (bodyIndex == -1) {
                customData.modelData.mpmParts.add(new MpmDataModel(bodyPartId).exportModelData())
            }

            let armorIndex = customData.modelData.mpmParts.findIndex(mpmData => mpmData.partId.toString() == armPartId)
            if (armorIndex == -1) {
                customData.modelData.mpmParts.add(new MpmDataModel(armPartId).exportModelData())
            }
            return
        }
        default:
            return
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function BurningHeartMpmTakeOff(customData, event, organItem, organIndex, slotType) {
    let bodyPartId = 'kubejs:parts/body/burning_heart_body_model.json'
    let armPartId = 'kubejs:parts/arms/burning_heart_arm_model.json'
    customData.modelData.mpmParts.removeIf(mpmData => (mpmData.partId.toString() == bodyPartId) || (mpmData.partId.toString() == armPartId))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:furnace_core')
        .addOnlyStrategy('entity_tick', FurnaceCoreEntityTickDefer, -1)
        .addOnlyStrategy('organ_take_off', FurnaceCoreTakeOff)
        .addOnlyStrategy('entity_do_damage', FurnaceCoreDoDamage)
        .addOnlyStrategy('organ_take_on', FurnaceCoreTakeOn)
        .addOnlyStrategy('mpm_render_take_on', BurningHeartMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', BurningHeartMpmTakeOff)
)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningHeartEntityTickDefer(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    let attributeInstance = event.entity.getAttribute('minecraft:generic.attack_damage')
    let damageValue = Math.max(10 - GetCustomDataMap(chestCavity, 'burningHeartDelay', 0), 0)
    // 烈焰槽位解除耐久消耗降低限制
    if (slotType != RevolutionFlame) {
        damageValue = Math.max(damageValue, 5)
    }

    if (!attributeInstance) return
    if (organItem.getDamageValue() + damageValue <= organItem.getMaxDamage()) {
        organItem.setDamageValue(organItem.getDamageValue() + damageValue)
        if (entity instanceof $ServerPlayer) {
            let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
            SetOrganEffect(chestCavity, organEffect)
        }
    } else {
        // 心火 -> 熔火
        let replaceItem = Item.of('kubejs:furnace_core')
        let damageValue = replaceItem.getMaxDamage()
        /**@type {number} */
        let blazerCount = GetCustomDataMap(chestCavity, 'blazePressurizerCounter', 0)
        if (blazerCount > 0) {
            damageValue = Math.max(damageValue - blazerCount * 10, 0)
            SetCustomDataMap(chestCavity, 'blazePressurizerCounter', 0)
            if (entity instanceof $ServerPlayer) {
                RemoveOrganEffect(chestCavity, 'kubejs:blaze_pressurizer')
            }
        }
        replaceItem.setDamageValue(damageValue)
        SetChestCavityOrgan(customData, event.chestCavity, replaceItem, organIndex, slotType, false)

        if (entity instanceof $ServerPlayer) {
            let organEffect = new OragnEffectModel(replaceItem).setPriority(organIndex).setCustomText((replaceItem.getMaxDamage() - replaceItem.getDamageValue()).toFixed(0))
            SetOrganEffect(chestCavity, organEffect)
            CommonDingNotice(sourceEntity.level, sourceEntity)
        }
    }
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningHeartDoDamageDefer(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const sourceEntity = event.source.actual
    const chestCavity = sourceEntity.chestCavityInstance
    let blazerBoost = 1
    /**@type {number} */
    let blazerCount = GetCustomDataMap(chestCavity, 'blazePressurizerCounter', 0)
    let damageBoost = GetCustomDataOrDefault(customData, 'burningItemDamageBoost', 0)
    let multiplierBoost = GetCustomDataOrDefault(customData, 'burningItemMultiplierBoost', 0)
    if (blazerCount > 0 && (multiplierBoost > 0 || damageBoost > 0)) {
        blazerBoost = 2
        blazerCount = blazerCount - 1
        SetCustomDataMap(chestCavity, 'blazePressurizerCounter', blazerCount)
        if (sourceEntity instanceof $ServerPlayer) {
            if (blazerCount <= 0) {
                RemoveOrganEffect(chestCavity, 'kubejs:blaze_pressurizer')
            } else {
                let organEffect = new OragnEffectModel(Item.of('kubejs:blaze_pressurizer')).setPriority(organIndex).setCustomText(blazerCount.toFixed(0))
                SetOrganEffect(chestCavity, organEffect)
            }
        }
    }
    damageBoost = damageBoost * blazerBoost
    multiplierBoost = multiplierBoost * blazerBoost
    event.amount = (event.amount + damageBoost) * (2 + multiplierBoost)
}



/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningHeartTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    let attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    attributeInstance.removeModifier(FurnaceCoreTempAttackUpUUID)
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:burning_heart')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BurningHeartTakeOn(customData, event, organItem, organIndex, slotType) {
    const { chestCavity, entity } = event
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:burning_heart')
        .addOnlyStrategy('entity_tick', BurningHeartEntityTickDefer, -1)
        .addOnlyStrategy('organ_take_off', BurningHeartTakeOff)
        .addOnlyStrategy('entity_do_damage', BurningHeartDoDamageDefer, -1)
        .addOnlyStrategy('organ_take_on', BurningHeartTakeOn)
        .addOnlyStrategy('mpm_render_take_on', BurningHeartMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', BurningHeartMpmTakeOff)
)


ServerEvents.recipes(event => {
    event.shapeless(GetOrganItemWithMPMType(Item.of('kubejs:burning_heart'), OrganItemMPMTypeShow), ['kubejs:plastic_stem_cells', 'kubejs:burning_heart', Ingredient.of('#forge:dyes/white')])
    event.shapeless(GetOrganItemWithMPMType(Item.of('kubejs:furnace_core'), OrganItemMPMTypeShow), ['kubejs:plastic_stem_cells', 'kubejs:furnace_core', Ingredient.of('#forge:dyes/white')])
})