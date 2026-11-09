// priority: 500

/**
 * @param {Internal.ItemStack} stack
 * @param {string} moduleKey
 * @param {string} impKey
 * @returns {boolean} 是否新增潜力标记
 */
function PotentialityTryAwaken(stack, moduleKey, impKey) {
    if (!stack || stack.isEmpty()) return false
    /**@type {Internal.ModularItem} */
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item)) return false
    let awakened = false
    for (let module of item.getMajorModules(stack)) {
        let key = String(module.getKey()).replace(/^tetra:/, '')
        if (key != moduleKey) continue
        if (module.getImprovement(stack, impKey)) continue
        module.addImprovement(stack, impKey, 0)
        awakened = true
    }
    return awakened
}

/**
 * 每条规则优先处理主手；主手本次没有新增标记时才尝试副手。
 * @param {string[]} triggerSpells
 * @param {string} moduleKey
 * @param {string} impKey
 */
function PotentialityAwakenOnCast(triggerSpells, moduleKey, impKey) {
    NativeEvents.onEvent($SpellOnCastEvent, /** @param {Internal.SpellOnCastEvent} event */ event => {
        if (event.entity.level.isClientSide()) return
        if (triggerSpells.indexOf(event.getSpellId()) == -1) return
        let entity = event.entity
        if (PotentialityTryAwaken(entity.getMainHandItem(), moduleKey, impKey)) return
        PotentialityTryAwaken(entity.getOffhandItem(), moduleKey, impKey)
    })
}

PotentialityAwakenOnCast(['kubejs:shockwave', 'kubejs:ascension'],
    'single/trident_head', 'potentiality/thundering_trident')
PotentialityAwakenOnCast(['irons_spellbooks:pocket_dimension', 'kubejs:advance_dragon_breath', 'kubejs:black_hole', 'kubejs:real_black_hole'],
    'bow/arcane_stave', 'potentiality/dimension_stave')
PotentialityAwakenOnCast(['kubejs:ice_tomb', 'kubejs:ice_aura'],
    'shield/fortress', 'potentiality/frost_fortress')
PotentialityAwakenOnCast(['kubejs:ice_tomb', 'kubejs:ice_aura'],
    'shield/buckler', 'potentiality/frost_fortress')
PotentialityAwakenOnCast(['kubejs:devour_teeth', 'kubejs:advance_wither_skull', 'kubejs:raise_overlord_undead'],
    'double/gula_scythe_left', 'potentiality/bloodshed_scythe_left')
PotentialityAwakenOnCast(['kubejs:devour_teeth', 'kubejs:advance_wither_skull', 'kubejs:raise_overlord_undead'],
    'double/gula_scythe_right', 'potentiality/bloodshed_scythe_right')
