// priority: 500
BiomancyEvents.onOrganBloomHarvest(event => {
    const blockState = event.blockState
    const block = blockState.block
    const level = event.level
    const player = event.player
    const pos = event.pos
    // todo 可以添加自定义器官
    // block.popResource(level, pos, Item.of('kubejs:primal_heart'))
    player.attack(level.damageSources().sweetBerryBush(), 1)
})