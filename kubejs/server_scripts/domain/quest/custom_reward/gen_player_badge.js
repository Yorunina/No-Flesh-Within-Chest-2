// priority: 500
FTBQuestsEvents.customReward('gen_player_badge', event => {
    const player = event.player
    const nbt = new $CompoundTag()
    nbt.putString('userName', player.getUsername())
    nbt.putLong('time', new Date().getTime())
    player.give(Item.of('kubejs:badge', 1, nbt))
})