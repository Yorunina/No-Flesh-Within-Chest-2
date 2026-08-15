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
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    }
    const server = event.player.server
    if (!server.singleplayer) return

    if (inputText == 'something for nothing') {
        GivePlayerItemList(player, ['ars_nouveau:creative_spell_book', 'functionalstorage:creative_vending_upgrade', 'ars_nouveau:creative_source_jar', Item.of('chestcavity:chest_opener').enchant('chestcavity:creative_surgery', 1), 'create:creative_crate', 'create_connected:creative_fluid_vessel', 'create:creative_blaze_cake', 'create:creative_fluid_tank', 'create:creative_motor'])
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    }
    if (inputText == 'show me the money') {
        player.give(Item.of('lightmanscurrency:wallet_ender_dragon', {
            AutoConvert: true,
            BonusSlots: 36,
            Items: Array.from({ length: 78 }, (_, i) => ({
                Count: 64,
                Slot: i,
                id: 'lightmanscurrency:coin_netherite'
            }))
        }))
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    }
    if (inputText == 'game over man') {
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
        server.stop()
        Client.stop()
    }
    if (inputText == 'black sheep wall') {
        player.give(Item.of('kubejs:bridge_mod'))
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    }

    if (inputText == 'power overwhelming') {
        player.give(Item.of('kubejs:tumor', '{organData:{"chestcavity:breath_capacity":999999.0f,"chestcavity:breath_recovery":999999.0f,"chestcavity:defense":999999.0f,"chestcavity:detoxification":999999.0f,"chestcavity:digestion":999999.0f,"chestcavity:endurance":999999.0f,"chestcavity:filtration":999999.0f,"chestcavity:health":999999.0f,"chestcavity:metabolism":999999.0f,"chestcavity:nerves":999999.0f,"chestcavity:strength":999999.0f,"kubejs:extreme_fitness":999999.0f,"kubejs:extreme_strength":999999.0f}}'))
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    }


})