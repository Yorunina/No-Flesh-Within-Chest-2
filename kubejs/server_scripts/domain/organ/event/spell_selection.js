// priority: 500
publicField.NFWC.events.OrganSpellSelectionEvent = new OrganEventModel('spell_selection')
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
const OrganSpellSelectionEvent = publicField.NFWC.events.OrganSpellSelectionEvent


/**
 * 
 * @param {Internal.SpellSelectionManager$SpellSelectionEvent} event 
 * @param {OrganEventCustomData} customData 
 */
// todo
function OrganSpellSelection(event, customData) {
    OrganSpellSelectionEvent.run(event.entity, customData, [event])
}

// 频繁刷取SpellSelectionManager会引发客户端崩溃
// 原方案可参考 commit：41fabe47049e67f21ac05fca721e9522c5381f69
PlayerEvents.loggedIn(event => {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    if (!player.connection) return
    new $SpellSelectionManager(player)
})

PlayerEvents.tick(event => {
    const player = event.player
    if (!player.connection) return
    if (player.age % 10 != 0) return
    if (!player.chestCavityInstance.customEntityDataMap.getOrDefault('refreshSpell', false)) return
    new $SpellSelectionManager(player)
})


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