// priority: 500
const PlayerSpellCastEvent = new OrganEventModel('player_spell_cast')


PlayerEvents.spellOnCast(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    PlayerSpellCastEvent.run(player, customData, [event])
})
