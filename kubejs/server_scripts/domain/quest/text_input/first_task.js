// priority: 500
MAAEvents.textInputTaskSubmit('first_task', (event) => {
    const player = event.player
    const inputText = event.inputText.toLowerCase()
    const teamData = event.teamData
    const task = event.task
    if (inputText != "") {
        teamData.addProgress(task, 1)
    }
    if (inputText.includes('hello') && inputText.includes('world')) {
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => {
            pTeamData.addProgress(pTask, 1)
        })
    }
})