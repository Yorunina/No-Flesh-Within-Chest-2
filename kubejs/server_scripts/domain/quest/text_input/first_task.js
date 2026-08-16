// priority: 500
/**
 * @type {ConditionStrategyModel[]}
 */
const FirstTaskStrategyList = []
MAAEvents.textInputTaskSubmit('first_task', (event) => {
    const player = event.player
    const inputText = event.inputText.toLowerCase()
    const teamData = event.teamData
    const task = event.task
    for (let strategy of FirstTaskStrategyList) {
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
function RegisterFirstTaskStrategy(testFunc, applyFunc, priority) {
    FirstTaskStrategyList.push(new ConditionStrategyModel(testFunc, applyFunc).setPriority(priority))
}

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => inputText != "",
    (player, inputText, teamData, task) => {
        teamData.addProgress(task, 1)
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => inputText.includes('hello') && inputText.includes('world'),
    (player, inputText, teamData, task) => {
        MAAUtils.onKubeTaskFinish('hello_world_task', player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => player.server.singleplayer && inputText == 'something for nothing',
    (player, inputText, teamData, task) => {
        GivePlayerItemList(player, ['ars_nouveau:creative_spell_book', 'functionalstorage:creative_vending_upgrade', 'ars_nouveau:creative_source_jar', Item.of('chestcavity:chest_opener').enchant('chestcavity:creative_surgery', 1), 'create:creative_crate', 'create_connected:creative_fluid_vessel', 'create:creative_blaze_cake', 'create:creative_fluid_tank', 'create:creative_motor'])
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => player.server.singleplayer && inputText == 'show me the money',
    (player, inputText, teamData, task) => {
        player.give(Item.of('lightmanscurrency:wallet_ender_dragon', {
            AutoConvert: true,
            BonusSlots: 36,
            Items: Array.from({ length: 78 }, (_, i) => ({
                Count: 64,
                Slot: i,
                id: 'lightmanscurrency:coin_netherite'
            }))
        }))
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => player.server.singleplayer && inputText == 'game over man',
    (player, inputText, teamData, task) => {
        player.server.stop()
        Client.stop()
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => player.server.singleplayer && inputText == 'black sheep wall',
    (player, inputText, teamData, task) => {
        player.give(Item.of('kubejs:bridge_mod'))
    },
    100
)

RegisterFirstTaskStrategy(
    (player, inputText, teamData, task) => player.server.singleplayer && inputText == 'power overwhelming',
    (player, inputText, teamData, task) => {
        player.give(Item.of('kubejs:tumor', '{organData:{"chestcavity:breath_capacity":999999.0f,"chestcavity:breath_recovery":999999.0f,"chestcavity:defense":999999.0f,"chestcavity:detoxification":999999.0f,"chestcavity:digestion":999999.0f,"chestcavity:endurance":999999.0f,"chestcavity:filtration":999999.0f,"chestcavity:health":999999.0f,"chestcavity:metabolism":999999.0f,"chestcavity:nerves":999999.0f,"chestcavity:strength":999999.0f,"kubejs:extreme_fitness":999999.0f,"kubejs:extreme_strength":999999.0f}}'))
    },
    100
)
