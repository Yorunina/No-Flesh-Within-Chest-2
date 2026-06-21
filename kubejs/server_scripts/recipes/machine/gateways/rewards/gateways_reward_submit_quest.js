// priority: 501
/**
 * 
 * @param {Internal.ServerPlayer} summoner 
 * @param {number} levelIndicator 
 * @param {number} chaosIndicator 
 * @param {number} typeIndicator 
 */
function eternalAltarSubmitQuest(summoner, levelIndicator, chaosIndicator, typeIndicator) {
    let taskIdList = ['eternal_altar_level_1']
    if (levelIndicator >= 5) taskIdList.push('eternal_altar_level_2')
    if (levelIndicator >= 10) taskIdList.push('eternal_altar_level_3')
    if (levelIndicator >= 30) taskIdList.push('eternal_altar_level_4')
    if (levelIndicator >= 50) taskIdList.push('eternal_altar_level_5')

    if (typeIndicator >= 0 && typeIndicator < 10) taskIdList.push('eternal_altar_type_1')
    else if (typeIndicator >= 10 && typeIndicator < 20) taskIdList.push('eternal_altar_type_2')
    else if (typeIndicator >= 20 && typeIndicator < 30) taskIdList.push('eternal_altar_type_3')
    else if (typeIndicator >= 30 && typeIndicator < 40) taskIdList.push('eternal_altar_type_4')
    else if (typeIndicator >= 40 && typeIndicator < 50) taskIdList.push('eternal_altar_type_5')
    else if (typeIndicator >= 50 && typeIndicator < 60) taskIdList.push('eternal_altar_type_6')

    if (typeIndicator == 8) taskIdList.push('eternal_altar_type_warden')
    else if (typeIndicator == 24) taskIdList.push('eternal_altar_type_ignis')
    else if (typeIndicator == 42) taskIdList.push('eternal_altar_type_harbinger')
    else if (typeIndicator == 51) taskIdList.push('eternal_altar_type_scylla')

    MAAUtils.onKubeTasksFinish(taskIdList, summoner, (task, pPlayer, pTeamData) => {
        pTeamData.addProgress(task, 1)
    })
}