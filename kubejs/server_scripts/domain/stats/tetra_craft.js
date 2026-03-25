// priority: 500
TetraJSEvents.workbenchTileCraft(event => {
    const player = event.player
    const schematic = event.currentSchematic
    player.stats.add(global.STAT_TETRA_CRAFT, 1)
    if (schematic.key.startsWith('shared/genesis_')) {
        player.stats.add(global.STAT_TETRA_CRAFT_GENESIS, 1)
    }
})