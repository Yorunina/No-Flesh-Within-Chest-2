// priority: 500
const OrganSpellSelectionEvent = new OrganEventModel('spell_selection')

/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function OrganSpellSelection(event, customData) {
    OrganSpellSelectionEvent.run(event.entity, customData, [event])
}

/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {*} spellId 
 * @param {*} level 
 */
function AddSpellSelectionOption(event, spellId, level) {
    event.addSelectionOption(
        new SpellData(
            SpellRegistry['getSpell(java.lang.String)'](spellId),
            level
        ), 
        'chestcavity',
        0
    )
}

/**
 * 用于在UpdateScoreUpdate事件中，用于添加客户端的法术显示
 * @param {*} customData 
 * @param {*} spellId 
 * @param {*} level 
 */
function AddRefreshClientSpellSelectionOption(customData, spellId, level) {
    customData.OrganSpellMap[spellId] = level
}
