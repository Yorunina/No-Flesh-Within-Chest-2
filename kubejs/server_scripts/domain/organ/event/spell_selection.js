// priority: 500
const OrganSpellSelectionEvent = new OrganEventModel('spell_selection')
    .addDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event
         */
        (customData, event) => {
            if (event.entity.isPlayer() && event.entity.connection) {
                let spellIds = Object.keys(customData.OrganSpellMap)
                let syncSpellData = new $CompoundTag()
                let spellDataList = new $ListTag()
                spellIds.forEach(/** @param {string} spellId */ spellId => {
                    let spellData = new $CompoundTag()
                    spellData.putString('spellId', spellId)
                    spellData.putInt('level', customData.OrganSpellMap[spellId])
                    spellDataList.add(spellData)
                })
                syncSpellData.put('spellList', spellDataList)
                event.entity.sendData('spell_selection_data', syncSpellData)
            }
        }
    )



/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {OrganEventCustomData} customData 
 */
// todo
function OrganSpellSelection(event, customData) {
    OrganSpellSelectionEvent.run(event.entity, customData, [event])
}


/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {*} customData 
 * @param {*} spellId 
 * @param {*} level 
 */
function AddSelectionOption(event, customData, spellId, level) {
    customData.OrganSpellMap[spellId] = level
    event.addSelectionOption(
        new SpellData(
            SpellRegistry['getSpell(java.lang.String)'](spellId),
            level
        ), 
        'chestcavity',
        0
    )
}