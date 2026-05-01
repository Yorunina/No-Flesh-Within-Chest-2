// priority: 500
// 流程控制结构展示
const MBToolStructureStageMap = new Map()
MbtoolKJSEvents.ScreenLoadStructures(event => {
    const structures = event.structures
    const stages = AStagesClient.getServerAndPlayerClientStages()
    let resList = []
    structures.forEach(structure => {
        let id = String(structure.id)
        if (!MBToolStructureStageMap.has(id)) return resList.push(structure)
        let stageNeed = MBToolStructureStageMap.get(id)
        if (stages.contains(stageNeed)) return resList.push(structure)
    })
    event.structures = resList
})

function RegistryStructureStage(id, stageNeed) {
    MBToolStructureStageMap.set(id, stageNeed)
}

RegistryStructureStage('mbtool:mbtool_structures/world_computer.nbt', 'ftb_world_computer_1')
RegistryStructureStage('mbtool:mbtool_structures/programmable_automatic_core.nbt', 'ftb_programmable_automatic_core_1')