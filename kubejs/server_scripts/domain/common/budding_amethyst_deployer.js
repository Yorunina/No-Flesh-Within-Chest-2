// priority: 500
BlockEvents.rightClicked('minecraft:budding_amethyst', event => {
    const level = event.level
    const block = event.block
    const entity = event.entity
    if (entity instanceof $DeployerFakePlayer) {
        block.blockState.randomTick(level, block.pos, level.random)
    }
})