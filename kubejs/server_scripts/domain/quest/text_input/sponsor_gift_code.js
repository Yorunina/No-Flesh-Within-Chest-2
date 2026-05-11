// priority: 500
MAAEvents.textInputTaskSubmit('sponsor_gift_code', (event) => {
    const player = event.player
    const inputText = event.inputText.trim().toLowerCase()
    const teamData = event.teamData
    const task = event.task
    teamData.addProgress(task, 1)
})
