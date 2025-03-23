// priority: 500
const OrganSpellSelectionEvent = new OrganEventModel('spell_selection')

/**
 * 玩家选择法术节点，使用该方法而不是用ironJs包装的方法用于区分客户端和服务端数据
 */
NativeEvents.onEvent('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent', /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
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
    OrganSpellSelectionEvent.run(entity, customData, [event])
    UpdateClientISSSpellDataEvent(customData, entity)
}