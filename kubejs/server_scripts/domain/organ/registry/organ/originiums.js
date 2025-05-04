// priority: 500
RegistryOrgan('kubejs:originiums')
    .addScore('chestcavity:health', -1)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.SpellOnCastEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function OriginiumsPlayerSpellCast(customData, event, organItem, organIndex, slotType) {
    const maxDamage = organItem.getMaxDamage()
    const curDamage = organItem.getDamageValue()
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (maxDamage - curDamage < maxDamage) {
        organItem.setDamageValue(curDamage - 1)
        if (entity instanceof $ServerPlayer) {
            let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((maxDamage - curDamage + 1).toFixed(0))
            SetOrganEffect(chestCavity, organEffect)
        }
        return
    }
    event.setSpellLevel(event.getSpellLevel() + Math.floor(maxDamage / 2))
    organItem.setDamageValue(maxDamage)
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText('0')
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
function OriginiumsTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:originiums')
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function OriginiumsMpmTakeOn(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/originium_dragon_arm_wide_model.json' : 'kubejs:parts/arms/originium_dragon_arm_slim_model.json'

    let index = customData.modelData.mpmParts.findIndex(mpmData => mpmData.partId.toString() == partId)

    if (index == -1) {
        customData.modelData.mpmParts.add(new MpmDataModel(partId).exportModelData())
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function OriginiumsMpmTakeOff(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/originium_dragon_arm_wide_model.json' : 'kubejs:parts/arms/originium_dragon_arm_slim_model.json'
    customData.modelData.mpmParts.removeIf(mpmData => mpmData.partId.toString() == partId)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:originiums')
        .addOnlyStrategy('player_spell_cast', OriginiumsPlayerSpellCast)
        .addOnlyStrategy('organ_take_off', OriginiumsTakeOff)
        .addOnlyStrategy('mpm_render_take_on', OriginiumsMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', OriginiumsMpmTakeOff)
)