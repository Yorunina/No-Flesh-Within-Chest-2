// priority: 3000
/**
 * 
 * @param {Internal.MinecraftServer} server 
 * @param {number} state 0为未开始，1为开始，2为经历过
 */
function SetEternalWinterState(server, state) {
    server.persistentData.putInt('isEternalWinter', state)
    if (state == 1) {
        $EternalWinterUtil.setEternalWinterEnabled(true)
        AStages.addStageToServer('ftb_under_eternal_winter', server)
    } else if (state == 2) {
        $EternalWinterUtil.setEternalWinterEnabled(false)
        AStages.removeStageFromServer('ftb_under_eternal_winter', server)
        AStages.addStageToServer('ftb_after_eternal_winter', server)
    } else {
        $EternalWinterUtil.setEternalWinterEnabled(false)
        AStages.removeStageFromServer('ftb_under_eternal_winter', server)
        AStages.removeStageFromServer('ftb_after_eternal_winter', server)
    }
}

/**
 * 
 * @param {Internal.MinecraftServer} server 
 */
function HadUnderEternalWinter(server) {
    return server.persistentData.getInt('isEternalWinter') > 0
}

/**
 * @param {Internal.MinecraftServer} server 
 * @param {number} num 
 */
function IncreaseEternalWinterCounter(server, num) {
    const persistentData = server.persistentData
    let counter = persistentData.getInt('eternal_winter_counter') + num
    persistentData.putInt('eternal_winter_counter', counter)
    if (counter >= 100 && server.persistentData.getInt('isEternalWinter') == 0) {
        SetEternalWinterState(server, 1)
    }
}

/**
 * @param {Internal.MinecraftServer} server 
 * @param {number} num 
 */
function DecreaseEternalWinterCounter(server, num) {
    const persistentData = server.persistentData
    let counter = persistentData.getInt('eternal_winter_counter') - num
    persistentData.putInt('eternal_winter_counter', counter)
    if (counter <= 0) {
        SetEternalWinterState(server, 2)
    }
}
