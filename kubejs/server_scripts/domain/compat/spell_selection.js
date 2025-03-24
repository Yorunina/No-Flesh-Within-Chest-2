// priority: 500
NetworkEvents.dataReceived('spell_selection_init', event => {
    const player = event.player
    InitClientISSSpellData(player)
})