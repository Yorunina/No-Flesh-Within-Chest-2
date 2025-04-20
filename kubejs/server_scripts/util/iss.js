// priority: 3000
/**
 * 更新客户端的法术数据，不存在在tick策略中
 * @param {OrganEventCustomData} customData
 * @param {Internal.ServerPlayer} entity
 */
function UpdateClientISSSpellDataEvent(customData, entity) {
    if (!customData.needRefreshSpellSelection) return
    if (!entity || !entity.isPlayer()) return
    if (!entity.connection) return
    const chestCavity = entity.chestCavityInstance
    const entityDataMap = chestCavity.customDataMap
    if (!entityDataMap || !entityDataMap.containsKey('organ_spell_selection')) return
    /**@type {Map<string, SpellData>} */
    const organSpellSelection = entityDataMap.get('organ_spell_selection')
    if (entityDataMap.containsKey('old_organ_spell_selection')) {
        /** @type {Map<string, SpellData>} */
        let oldOrganSpellSelection = entityDataMap.get('old_organ_spell_selection')
        if (oldOrganSpellSelection.size == organSpellSelection.size) {
            let isSame = true
            organSpellSelection.forEach(/** @param {SpellData} spellData */ spellData => {
                let spellId = spellData.getSpell().getSpellId()
                spellId = String(spellId)
                if (!oldOrganSpellSelection.has(spellId) || oldOrganSpellSelection.get(spellId).getLevel() != spellData.getLevel()) {
                    isSame = false
                    return
                }
            })
            if (isSame) return
        }
    }
    entityDataMap.put('old_organ_spell_selection', new Map(organSpellSelection))
    let syncSpellData = new $CompoundTag()
    let spellNBTList = new $ListTag()
    organSpellSelection.forEach(/** @param {SpellData} spellData */ spellData => {
        let spellNBT = new $CompoundTag()
        spellNBT.putString('spellId', spellData.getSpell().getSpellId())
        spellNBT.putInt('level', spellData.getLevel())
        spellNBTList.add(spellNBT)
    })
    syncSpellData.put('spellList', spellNBTList)
    syncSpellData.putString('mode', 'refresh')
    entity.sendData('spell_selection_data', syncSpellData)
}

/**
 * 强制初始化客户端的法术数据，用于补偿客户端数据丢失的情况
 * @param {Internal.ServerPlayer} entity
 */
function InitClientISSSpellData(entity) {
    const chestCavity = entity.chestCavityInstance
    const entityDataMap = chestCavity.customDataMap
    if (!entityDataMap || !entityDataMap.containsKey('organ_spell_selection')) return
    /**@type {Map<string, SpellData>} */
    const organSpellSelection = entityDataMap.get('organ_spell_selection')
    entityDataMap.put('old_organ_spell_selection', new Map(organSpellSelection))
    let syncSpellData = new $CompoundTag()
    let spellNBTList = new $ListTag()
    organSpellSelection.forEach(/** @param {SpellData} spellData */ spellData => {
        let spellNBT = new $CompoundTag()
        spellNBT.putString('spellId', spellData.getSpell().getSpellId())
        spellNBT.putInt('level', spellData.getLevel())
        spellNBTList.add(spellNBT)
    })
    syncSpellData.put('spellList', spellNBTList)
    syncSpellData.putString('mode', 'refresh')
    entity.sendData('spell_selection_data', syncSpellData)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function AddSpellSelection(customData, entityDataMap, spellId, spellLvl) {
    const entityDataMap = chestCavity.customDataMap
    /**@type {Map<string, SpellData>} */
    let spellSlectionMap = entityDataMap.getOrDefault('organ_spell_selection', new Map())
    spellId = String(spellId)
    if (spellSlectionMap.has(spellId)) {
        if (spellSlectionMap.get(spellId).getLevel() >= spellLvl) return
        spellSlectionMap.set(spellId, new SpellData(spellId, spellLvl))
    } else {
        spellSlectionMap.set(spellId, new SpellData(spellId, spellLvl))
    }
    entityDataMap.put('organ_spell_selection', spellSlectionMap)
    customData.needRefreshSpellSelection = true
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function RemoveSpellSelection(customData, chestCavity, spellId, spellLvl) {
    const entityDataMap = chestCavity.customDataMap
    /**@type {Map<string, SpellData>} */
    let spellSlectionMap = entityDataMap.getOrDefault('organ_spell_selection', new Map())
    spellId = String(spellId)
    if (spellSlectionMap.has(spellId)) {
        let spellData = spellSlectionMap.get(spellId)
        if (spellData.getLevel() == spellLvl) {
            spellSlectionMap.delete(spellId)
            entityDataMap.put('organ_spell_selection', spellSlectionMap)
            customData.needRefreshSpellSelection = true
        }
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function RemoveSpellSelectionBySpellId(customData, chestCavity, spellId) {
    const entityDataMap = chestCavity.customDataMap
    /**@type {Map<string, SpellData>} */
    let spellSlectionMap = entityDataMap.getOrDefault('organ_spell_selection', new Map())
    if (spellSlectionMap.has(spellId)) {
        spellSlectionMap.delete(spellId)
        entityDataMap.put('organ_spell_selection', spellSlectionMap)
    }
}



/**
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 */
function ApplyPlayerSpellSelection(event) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    const customDataMap = chestCavity.customDataMap
    if (!customDataMap || !customDataMap.containsKey('organ_spell_selection')) return
    /**@type {Map<string, SpellData>} */
    const organSpellSelection = customDataMap.get('organ_spell_selection')
    let index = 0
    organSpellSelection.forEach(/** @param {SpellData} spellData */ spellData => {
        event.addSelectionOption(spellData, 'chestcavity', index)
        index++
    })
}