// priority: 500
const DungeonObeliskBiomeTypeMap = {}
const DungeonObeliskPurifyActionTypeMap = {}
/**
 * 
 * @param {String} biomeInput 
 * @param {String} biome 
 */
function RegisteyDungeonObeliskBiomeType(biomeInput, biome) {
    DungeonObeliskBiomeTypeMap[biomeInput] = biome
}
/**
 * 
 * @param {String} purifyActionInput 
 * @param {String} purifyAction 
 */
function RegisteyDungeonObeliskPurifyActionType(purifyActionInput, purifyAction) {
    DungeonObeliskPurifyActionTypeMap[purifyActionInput] = purifyAction
}


ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:dungeon_obelisk', 180)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.machine
            const block = ctx.block
            const level = block.level
            const pos = block.getPos()

            let permitItem = machine.getItemStored('permit_input')
            let permitLevel = 1
            if (permitItem.hasNBT() && permitItem.getNbt().contains('level')) {
                permitLevel = permitItem.getNbt().getInt('level')
            }

            let biomeInput = machine.getItemStored('biome_input')
            let biomeInputStr = biomeInput ? biomeInput.id.toString() : 'random'
            let dataStorageInput = machine.getItemStored('data_storage_input')
            let dataStorageInputStr = dataStorageInput ? dataStorageInput.id.toString() : 'random'
            let customInput1 = machine.getItemStored('custom_input_1')
            let customInput2 = machine.getItemStored('custom_input_2')
            let customInput3 = machine.getItemStored('custom_input_3')

            let targetBiomeType = DungeonObeliskBiomeTypeMap[biomeInputStr] ?
                DungeonObeliskBiomeTypeMap[biomeInputStr] :
                DungeonObeliskBiomeTypeMap[RandomGet(Object.keys(DungeonObeliskBiomeTypeMap))]

            let purifyActionType = DungeonObeliskPurifyActionTypeMap[dataStorageInputStr] ?
                DungeonObeliskPurifyActionTypeMap[dataStorageInputStr] :
                DungeonObeliskPurifyActionTypeMap[RandomGet(Object.keys(DungeonObeliskPurifyActionTypeMap))]


            let area = GenDungeonLevelArea(level, pos)
            if (!area) return ctx.error()
            let areaPersistData = area.getPersistentData()
            areaPersistData.putString('targetBiomeType', targetBiomeType)
            areaPersistData.putString('purifyActionType', purifyActionType)
            areaPersistData.put('actionInputItem1', ConverItemStack2NBT(customInput1.withCount(1)))
            areaPersistData.put('actionInputItem2', ConverItemStack2NBT(customInput2.withCount(1)))
            areaPersistData.put('actionInputItem3', ConverItemStack2NBT(customInput3.withCount(1)))

            machine.setItemStored('custom_input_1', customInput1.withCount(customInput1.getCount() - 1))
            machine.setItemStored('custom_input_2', customInput2.withCount(customInput2.getCount() - 1))
            machine.setItemStored('custom_input_3', customInput3.withCount(customInput3.getCount() - 1))

            let manager = LoquatAreaManager.of(level)
            manager.addEvent(new $SpawnMobAreaKubeEvent(area, 'killAmountTask_ZombieGroupTask_1', 1, 0))

            return ctx.success()
        })
        .requireItem('kubejs:signal_launch_permit', 'permit_input')
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