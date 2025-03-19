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