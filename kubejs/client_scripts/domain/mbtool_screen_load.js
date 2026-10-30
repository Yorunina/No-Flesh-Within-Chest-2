// priority: 500
// 流程控制结构展示
const MBToolStructureStageMap = new Map()
MbtoolKJSEvents.ScreenLoadStructures(event => {
    const structures = event.structures
    const stages = AStagesClient.getServerAndPlayerStages()
    let resList = []
    structures.forEach(structure => {
        let id = String(structure.id)
        if (!MBToolStructureStageMap.has(id)) return resList.push(structure)
        let stageNeed = MBToolStructureStageMap.get(id)
        if (stages.contains(stageNeed)) return resList.push(structure)
    })
    event.structures = resList
})

/**
 * 设置结构预览所需的解锁阶段。
 * @param {string} id
 * @param {string} stageNeed
 * @returns {void}
 */
function RegistryStructureStage(id, stageNeed) {
    MBToolStructureStageMap.set(id, stageNeed)
}

RegistryStructureStage('mbtool:mbtool_structures/world_computer.nbt', 'ftb_world_computer_1')
RegistryStructureStage('mbtool:mbtool_structures/programmable_automatic_core.nbt', 'ftb_programmable_automatic_core_1')
RegistryStructureStage('mbtool:mbtool_structures/steam_engine.nbt', 'ftb_steam_engine_1')
RegistryStructureStage('mbtool:mbtool_structures/advance_organ_processing_table.nbt', 'ftb_advance_organ_processing_table_1')
