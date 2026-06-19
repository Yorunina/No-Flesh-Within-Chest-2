// priority: 999
const OrganISSSpellLevelModifyEvent = new OrganEventModel('iss_spell_level_modify')

/**
 * 法术等级修正
 */
NativeEvents.onEvent($ModifySpellLevelEvent, /** @param {Internal.ModifySpellLevelEvent} event */ event => {
    const entity = event.entity
    if (!entity.isAlive() || entity.level.isClientSide()) return
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
    OrganISSSpellLevelModifyEvent.run(entity, customData, [event])
}
