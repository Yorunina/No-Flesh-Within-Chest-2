// priority: 999
const OrganISSSpellSelectionEvent = new OrganEventModel('iss_spell_selection')

/**
 * 玩家选择法术节点，使用该方法而不是用ironJs包装的方法用于区分客户端和服务端数据
 */
NativeEvents.onEvent($SpellSelectionEvent, /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    if (entity.level.isClientSide()) return
    if (!entity.isAlive() || !entity.isPlayer()) return
    let customData = {}
    OrganSpellSelection(event, customData)
})

/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function OrganSpellSelection(event, customData) {
    const entity = event.entity
    OrganISSSpellSelectionEvent.run(entity, customData, [event])
    UpdateClientISSSpellDataEvent(customData, entity)
    ApplyPlayerSpellSelection(event)
}

