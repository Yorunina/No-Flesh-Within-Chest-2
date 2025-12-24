// priority: 500
// 优先级需要低于函数优先级避免加载问题
const CarnivalStageActionList = [
    CarnivalStage0,
    CarnivalStage1,
    CarnivalStage2,
    CarnivalStage3,
    CarnivalStage4,
    CarnivalStage5,
    CarnivalStage6,
    CarnivalStage7,
    CarnivalStage8,
    CarnivalStage9,
    CarnivalStage10,
    CarnivalStage11,
    CarnivalStage12,
    CarnivalStage13,
]

const CarnivalLightsPositions = [
    [[-8, 9, -8], [-8, 9, 8], [8, 9, -8], [8, 9, 8]],
    [[-12, 9, -12], [-12, 9, 12], [12, 9, -12], [12, 9, 12]],
    [[-12, 12, -8], [-12, 12, 8], [12, 12, -8], [12, 12, 8]],
    [[-8, 12, -12], [-8, 12, 12], [8, 12, -12], [8, 12, 12]]
]

BlockEvents.rightClicked('biomancy:flesh', event => {
    const item = event.item
    const level = event.level
    const block = event.block
    if (item.hasTag('vinery:red_wine')) {
        let age = $WineYears.getWineAge(item, level)
        level.setBlockAndUpdate(block.pos, Block.getBlock('kubejs:carnival').defaultBlockState())
        let blockEntity = level.getBlockEntity(block.pos)
        if (blockEntity) {
            blockEntity.data.putInt('canTry', age)
        }
        item.shrink(1)
    }
})

function CarnivalNextSubStage(data) {
    const subStage = data.getInt('subStage')
    data.putInt('subStage', subStage + 1)
}
function CarnivalNextStage(data) {
    const stage = data.getInt('stage')
    data.putInt('stage', stage + 1)
    data.putInt('subStage', 0)
}
function CarnivalSetTimer(data, timer) {
    data.putInt('timer', timer)
}

/**
 * @param {Internal.BlockEntityJS} ctx 
 */
global.CarnivalServerTick = function (ctx) {
    const data = ctx.data
    const level = ctx.level
    let timer = data.getInt('timer')
    if (timer != 0) {
        timer--
        data.putInt('timer', timer)
        return
    }
    if (level.isDay()) {
        ctx.level.setBlockAndUpdate(ctx.blockPos, Block.getBlock('biomancy:flesh').defaultBlockState())
        return
    }
    const stage = data.getInt('stage')
    if (stage >= CarnivalStageActionList.length) {
        ctx.level.setBlockAndUpdate(ctx.blockPos, Block.getBlock('biomancy:flesh').defaultBlockState())
        return
    }
    if (!CarnivalStageActionList[stage](ctx)) {
        failCarnival(ctx, Text.translatable(`msg.kubejs.carnibal_stage.${stage}.fail`))
        return
    }
}

/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @param {Internal.Component} reason 
 * @returns 
 */
function failCarnival(ctx, reason) {
    ctx.level.setBlockAndUpdate(ctx.blockPos, Block.getBlock('biomancy:flesh').defaultBlockState())
    CarnivalAnnounceToPlayers(ctx, reason)
    return
}

/**
 * 
 * @param {Internal.BlockEntityJS} ctx 
 * @param {Internal.Component} info 
 * @returns 
 */
function CarnivalAnnounceToPlayers(ctx, info) {
    const players = ctx.block.getPlayersInRadius(16)
    players.forEach(pPlayer => pPlayer.setStatusMessage(info))
}
