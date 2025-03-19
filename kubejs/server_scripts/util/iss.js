// priority: 2500
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ServerPlayer} player
 */
function UpdateClientISSSpellData(customData, player) {
    const chestCavity = player.chestCavityInstance
    const entityDataMap = chestCavity.customDataMap
    if (!entityDataMap || !entityDataMap.containsKey('organ_spell_selection')) return
    /**@type {Map<string, SpellData>} */
    const organSpellSelection = entityDataMap.get('organ_spell_selection')
    let syncSpellData = new $CompoundTag()
    let spellNBTList = new $ListTag()
    organSpellSelection.forEach(/** @param {SpellData} spellData */ spellData => {
        let spellNBT = new $CompoundTag()
        spellNBT.putString('spellId', spellData.getSpell().getSpellId())
        spellNBT.putInt('level', spellData.getLevel())
        spellNBTList.add(spellNBT)
    })
    console.log(spellNBTList)
    syncSpellData.put('spellList', spellNBTList)
    syncSpellData.putString('mode', 'refresh')
    player.sendData('spell_selection_data', syncSpellData)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ServerPlayer} player
 * @param {number} organIndex
 */
function AddClientISSSpellDataDefer(customData, player, organIndex) {
    if (customData['refreshClientISS']) return
    customData['refreshClientISS'] = true
    customData.localDefers.push(new OrganLocalDeferModel([player], UpdateClientISSSpellData, organIndex))
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.Map<string, any>} entityDataMap 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function AddSpellSelection(customData, entityDataMap, spellId, spellLvl) {
    /**@type {Map<string, SpellData>} */
    let spellSlectionMap = entityDataMap.getOrDefault('organ_spell_selection', new Map())
    if (spellSlectionMap.has(spellId)) {
        let spellData = spellSlectionMap.get(spellId)
        let maxLevel = Math.max(spellData.getLevel(), spellLvl)
        spellSlectionMap.set(spellId, new SpellData(spellId, maxLevel))
    } else {
        spellSlectionMap.set(spellId, new SpellData(spellId, spellLvl))
    }
    entityDataMap.put('organ_spell_selection', spellSlectionMap)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.Map<string, any>} entityDataMap 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function RemoveSpellSelection(customData, entityDataMap, spellId, spellLvl) {
    /**@type {Map<string, SpellData>} */
    let spellSlectionMap = entityDataMap.getOrDefault('organ_spell_selection', new Map())
    if (spellSlectionMap.has(spellId)) {
        let spellData = spellSlectionMap.get(spellId)
        if (spellData.getLevel() == spellLvl) {
            spellSlectionMap.delete(spellId)
            entityDataMap.put('organ_spell_selection', spellSlectionMap)
        }
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.Map<string, any>} entityDataMap 
 * @param {string} spellId 
 * @param {number} spellLvl 
 */
function RemoveSpellSelectionBySpellId(customData, entityDataMap, spellId) {
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