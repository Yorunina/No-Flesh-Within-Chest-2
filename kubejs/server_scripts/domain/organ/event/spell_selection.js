// priority: 500
const OrganSpellSelectionEvent = new OrganEventModel('spell_selection')
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event
         */
        (customData, event) => {
        }
    )



/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {any} customData 
 */
// todo
function OrganSpellSelection(event, customData) {

    OrganSpellSelectionEvent.run(event.entity, customData, [event])
}