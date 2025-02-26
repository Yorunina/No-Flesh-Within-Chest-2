// priority: 500
const OrganAdditionSpellSelectionList = []

NetworkEvents.dataReceived('spell_selection_data', event => {
    /**@type {Internal.ListTag} */
    const spellDataNbt = event.getData()
    OrganAdditionSpellSelectionList.length = 0
    let spellListNbt = spellDataNbt.get('spellList')
    spellListNbt.forEach(/**@param {Internal.CompoundTag} element */ element => {
        OrganAdditionSpellSelectionList.push(
            new SpellData(
                SpellRegistry["getSpell(java.lang.String)"](element.getString('spellId')),
                element.getInt('level')
            )
        )
    })
    $ClientMagicData.updateSpellSelectionManager()
})

NativeEvents.onEvent('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent', /** @param {Internal.SpellSelectionManager$SpellSelectionEvent} event */ event => {
    if (!event.entity) return
    if (!event.entity.level.isClientSide()) return
    OrganAdditionSpellSelectionList.forEach(/** @param {SpellData} element */ element => {
        event.addSelectionOption(element, 'chestcavity', 0)
    })
})

