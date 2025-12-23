// priority: 500
const CarnivalStageActionList = [
    CarnivalStage0,
    CarnivalStage1,
    CarnivalStage2,
    CarnivalStage3,
    CarnivalStage4,
    CarnivalStage5,
    CarnivalStage6,
    CarnivalStage7,
]

const CarnivalLightsPositions = [
    [[-4, 9, -4], [-4, 9, 4], [4, 9, -4], [4, 9, 4]],
    [[-8, 9, -8], [-8, 9, 8], [8, 9, -8], [8, 9, 8]],
    [[-8, 7, -4], [-8, 7, 4], [8, 7, -4], [8, 7, 4]],
    [[-4, 7, -8], [-4, 7, 8], [4, 7, -8], [4, 7, 8]]
]

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
    if (level.isDay()) {
        failCarnival(ctx, 'msg.kubejs.carnival.fail.isDay')
        return
    }
    if (level.isThundering() || level.isRaining()) {
        failCarnival(ctx, 'msg.kubejs.carnival.fail.isThunderingOrRaining')
        return
    }
    let timer = data.getInt('timer')
    if (timer != 0) {
        timer--
        data.putInt('timer', timer)
        return
    }

    const stage = data.getInt('stage')
    if (stage >= CarnivalStageActionList.length) {
        failCarnival(ctx, 'msg.kubejs.carnival.fail.stage')
        return
    }
    if (!CarnivalStageActionList[stage](ctx)) {
        failCarnival(ctx, `msg.kubejs.carnibal_stage.${stage}.fail`)
        return
    }
    data.putInt('timer', 200)
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
    players.forEach(pPlayer => pPlayer.tell(info))
}
