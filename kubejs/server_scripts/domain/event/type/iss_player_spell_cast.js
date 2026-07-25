// priority: 999
const OrganISSPlayerSpellCastEvent = new OrganEventModel('iss_player_spell_cast')

PlayerEvents.spellOnCast(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganISSPlayerSpellCastEvent.run(player, customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
})