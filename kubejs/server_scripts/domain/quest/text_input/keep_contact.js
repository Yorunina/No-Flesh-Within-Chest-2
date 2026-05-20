// priority: 500
/**
 * @type {ConditionStrategyModel[]}
 */
const KeepContactStrategyList = []
MAAEvents.textInputTaskSubmit('keep_contact', (event) => {
    const player = event.player
    const inputText = event.inputText.trim().toLowerCase()
    const teamData = event.teamData
    const task = event.task
    if (AStages.serverHasStage(FTBFinalTimerStart, null)) return
    for (let strategy of KeepContactStrategyList) {
        if (strategy.test([player, inputText, teamData, task])) {
            strategy.run([player, inputText, teamData, task])
        }
    }
})

/**
 * 
 * @param {function(Player, String, TeamData, Internal.Task): boolean} testFunc 
 * @param {function(Player, String, TeamData, Internal.Task): void} applyFunc 
 * @param {number} priority 
 */
function RegisterKeepContactStrategy(testFunc, applyFunc, priority) {
    KeepContactStrategyList.push(new ConditionStrategyModel(testFunc, applyFunc).setPriority(priority))
}

RegisterKeepContactStrategy(
    () => true,
    (player, inputText, teamData, task) => {
        if (inputText.includes('i') && inputText.includes('sponsor')) {
            MAAUtils.onKubeTaskFinish('sponsor_task', player, (pTask, pPlayer, pTeamData) => {
                pTeamData.addProgress(pTask, 1)
            })
            return
        }
    },
    100
)