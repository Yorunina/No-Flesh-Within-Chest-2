// priority: 1000
StartupEvents.registry('item', event => {
    event.create('kubejs:faded_disc', 'music_disc')
        .song('kubejs:faded_song', 99)
        .analogOutput(1)
        .texture('kubejs:item/materials/faded_song_disc')
        .displayName('Music Disc: Faded')
        .maxStackSize(1)
})