// priority: 500
const OrganSpellLevelModify = new OrganEventModel('spell_level_modify')

/**
 * 法术等级修正
 */
NativeEvents.onEvent('io.redspace.ironsspellbooks.api.events.ModifySpellLevelEvent', /** @param {Internal.ModifySpellLevelEvent} event */ event => {
    const entity = event.entity
    if (!entity.isAlive()) return
    let customData = {}
    OrganModifySpellLevel(event, customData)
})

/**
 * 法术等级修正
 * @param {Internal.ModifySpellLevelEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function OrganModifySpellLevel(event, customData) {
    const entity = event.entity
    OrganSpellLevelModify.run(entity, customData, [event])
}
