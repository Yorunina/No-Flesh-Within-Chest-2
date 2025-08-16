// priority: 500
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:dungeon_obelisk', 180)
        .requireItem('kubejs:signal_launch_permit', 'permit_input')
        .requireFunctionOnStart(ctx => {
            const machine = ctx.machine
            const block = ctx.block
            const level = block.level
            const typeInput = machine.getItemStored()

            return ctx.success()
        })
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.machine
            const block = ctx.block
            const level = block.level

            return ctx.success()
        })
        .requireButtonPressed('launch_button')
        .resetOnError()
})


// 多方块基本能力
// 石碑上下位置同步破坏
BlockEvents.broken('kubejs:dungeon_obelisk_base', event => {
    const block = event.block
    const level = event.level
    const pos = block.getPos()
    const abovePos = pos.above()
    let aboveBlock = level.getBlock(abovePos)
    if (aboveBlock.id != 'kubejs:dungeon_obelisk_top') return
    level.setBlock(abovePos, Blocks.AIR.defaultBlockState(), 3)
})

BlockEvents.broken('kubejs:dungeon_obelisk_top', event => {
    const block = event.block
    const level = event.level
    const pos = block.getPos()
    const belowPos = pos.below()
    let belowBlock = level.getBlock(belowPos)
    if (belowBlock.id != 'kubejs:dungeon_obelisk_base') return
    level.setBlock(belowPos, Blocks.AIR.defaultBlockState(), 3)
})

// 石碑上下位置同步放置
BlockEvents.placed('kubejs:dungeon_obelisk_base', event => {
    const block = event.block
    const level = event.level
    const pos = block.getPos()
    const abovePos = pos.above()
    level.setBlock(abovePos, Block.getBlock('kubejs:dungeon_obelisk_top').defaultBlockState(), 3)
    let obeliskBlockEntity = level.getBlockEntity(pos)
    obeliskBlockEntity.persistentData.putString('purifyAction', 'default')
})

BlockEvents.placed('kubejs:dungeon_obelisk_top', event => {
    const block = event.block
    const level = event.level
    const pos = block.getPos()
    const belowPos = pos.below()
    level.setBlock(belowPos, Block.getBlock('kubejs:dungeon_obelisk_base').defaultBlockState(), 3)
    let obeliskBlockEntity = level.getBlockEntity(belowPos)
    obeliskBlockEntity.persistentData.putString('purifyAction', 'default')
})

// 右键事件同步
BlockEvents.rightClicked('kubejs:dungeon_obelisk_top', event => {
    const block = event.block
    const level = event.level
    const pos = block.getPos()
    const belowPos = pos.below()
    let belowBlock = level.getBlock(belowPos)
    if (belowBlock.id != 'kubejs:dungeon_obelisk_base') return
    let machineTile = level.getBlockEntity(belowPos)
    if (!machineTile) return
    $CustomMachineContainer.open(event.player, machineTile)
})