// priority: 501
/**
 * @type {ConditionStrategyModel[]}
 */
const ScrollWritingStrategyList = []
TetraJSEvents.workbenchTileCraft(event => {
    const schematic = event.currentSchematic
    if (schematic.key != 'scroll/material/hone_writing') return
    ScrollWritingStrategyList.sort((a, b) => b.priority - a.priority)
    for (let strategy of ScrollWritingStrategyList) {
        if (strategy.test([event])) {
            strategy.run([event])
            MAAUtils.onKubeTaskFinish('tetra_scroll_writing', event.player, (pTask, pPlayer, pTeamData) => pTeamData.addProgress(pTask, 1))
            return
        }
    }
})
/**
 * 
 * @param {function(Internal.WorkbenchTileCraftEventJS): boolean} testFunc 
 * @param {function(Internal.WorkbenchTileCraftEventJS): void} applyFunc 
 * @param {number} priority 
 */
function RegisterScrollWritingStrategy(testFunc, applyFunc, priority) {
    ScrollWritingStrategyList.push(new ConditionStrategyModel(testFunc, applyFunc).setPriority(priority))
}

RegisterScrollWritingStrategy(
    (event) => { return true },
    (event) => { event.setUpgradedStack(Item.of('minecraft:paper')) },
    0
)