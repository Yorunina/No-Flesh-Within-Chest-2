// priority: 500
/**
 * @type {Map<string, SpellData>}
 */
const OrganAdditionSpellSelectionMap = new Map()

NetworkEvents.dataReceived('iss_spell_selection_data', event => {
    /**@type {Internal.ListTag} */
    const spellDataNbt = event.getData()
    let mode = spellDataNbt.getString('mode')
    let spellListNbt = spellDataNbt.get('spellList')
    switch (mode) {
        case 'add':
            spellListNbt.forEach(/**@param {Internal.CompoundTag} element */ element => {
                let spellId = element.getString('spellId')
                let lvl = element.getInt('level')
                OrganAdditionSpellSelectionMap.set(spellId, new SpellData(
                    SpellRegistry["getSpell(java.lang.String)"](spellId),
                    lvl
                ))
            })
            break
        case 'remove':
            spellListNbt.forEach(/**@param {Internal.CompoundTag} element */ element => {
                let spellId = element.getString('spellId')
                OrganAdditionSpellSelectionMap.delete(spellId)
            })
            break
        case 'refresh':
            OrganAdditionSpellSelectionMap.clear()
            spellListNbt.forEach(/**@param {Internal.CompoundTag} element */ element => {
                let spellId = element.getString('spellId')
                let lvl = element.getInt('level')
                OrganAdditionSpellSelectionMap.set(spellId, new SpellData(
                    SpellRegistry["getSpell(java.lang.String)"](spellId),
                    lvl
                ))
            })
            break
    }
    $ClientMagicData.updateSpellSelectionManager()
})

NativeEvents.onEvent($SpellSelectionEvent, /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
    if (!event.entity) return
    if (!event.entity.level.isClientSide()) return
    let index = 0
    OrganAdditionSpellSelectionMap.forEach(element => {
        event.addSelectionOption(element, 'chestcavity', index)
        index++
    })
})
