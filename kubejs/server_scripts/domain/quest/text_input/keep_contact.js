// priority: 500
MAAEvents.textInputTaskSubmit('keep_contact', (event) => {
    const player = event.player
    const inputText = event.inputText.toLowerCase()
    const teamData = event.teamData
    const task = event.task
    if (inputText.includes('im') && inputText.includes('sponsor')) {
        MAAUtils.onKubeTaskFinish('sponsor_task', player, (pTask, pPlayer, pTeamData) => {
            pTeamData.addProgress(pTask, 1)
        })
        return
    }
    teamData.addProgress(task, 1)
})
