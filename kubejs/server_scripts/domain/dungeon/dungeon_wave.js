// priority: 800
const WaveStatusWaitInit = 0
const WaveStatusRunning = 1
const WaveStatusWaiting = 2

LoquatEvents.areaSpawnMobWaveTick(event => {
    const context = event.context
    if (context.ticksExisted % 20 != 0) return

    const level = event.level
    const area = context.area
    const areaManager = event.getAreaManager()
    const customDataMap = context.customDataMap

    if (!customDataMap.containsKey('dungeonEventAction')) {
        if (!DungeonSpawnerIdMap[context.spawnerId]) {
            // 未知状态，直接回收，但允许重试
            recycleArea(areaManager, area)
            SetDungeonObeliskState(level, area, 0)
            return
        }
        /**@type {DungeonEventActionModel} */
        let dungeonEventModel = DungeonSpawnerIdMap[context.spawnerId]
        customDataMap.put('dungeonEventAction', dungeonEventModel)
        dungeonEventModel.initAction(level, context, areaManager)
        SetDungeonObeliskState(level, area, 1)
    }

    /**@type {DungeonEventActionModel} */
    let dungeonEventModel = customDataMap.get('dungeonEventAction')
    let waveId = context.waveId
    // 如果波次不存在，认为成功
    if (dungeonEventModel.waves.length <= waveId || waveId < 0) {
        dungeonSuccessAction(level, context, areaManager, dungeonEventModel)
        return
    }
    let waveStatus = GetWaveStatus(customDataMap)
    let waveAction = dungeonEventModel.waves[waveId]
    switch (waveStatus) {
        case WaveStatusWaitInit:
            waveAction.initAction(level, context, areaManager)
            SetWaveStatus(customDataMap, WaveStatusRunning)
            return
        case WaveStatusRunning:
            waveAction.tickAction(level, context, areaManager)
            let shouldFinishWave = waveAction.tickTester(level, context, areaManager)
            if (context.waveEndTicks < context.ticksExisted) {
                // 如果不满足波次要求，则回收该区域
                if (!waveAction.endTester(level, context, areaManager)) {
                    waveAction.finishAction(level, context, areaManager, false)
                    dungeonEventModel.finishAction(level, context, areaManager, false)
                    SetDungeonObeliskState(level, area, 3)
                    recycleArea(areaManager, area)
                    return
                } else {
                    shouldFinishWave = true
                }
            }
            if (shouldFinishWave) {
                // 需要等待业务自行更改状态机
                let dungeonSuccess = waveAction.finishAction(level, context, areaManager, true)
                if (dungeonSuccess) {
                    dungeonSuccessAction(level, context, areaManager, dungeonEventModel)
                    return
                }
                return
            }
            return
        case WaveStatusWaiting:
            // 等待中，不执行任何操作
            return
        default:
            // 未知状态，直接回收，并且置灰，禁止重试
            recycleArea(areaManager, area)
            SetDungeonObeliskState(level, area, 3)
            return
    }
})

/**
 * 地牢成功行为
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {LoquatAreaManager} areaManager 
 * @param {DungeonEventActionModel} dungeonEventModel
 */
function dungeonSuccessAction(level, context, areaManager, dungeonEventModel) {
    dungeonEventModel.finishAction(level, context, areaManager, true)
    SetDungeonObeliskState(level, context.area, 2)
    recycleArea(areaManager, context.area)
}


/**
 * 回收区域
 * @param {LoquatAreaManager} areaManager 
 * @param {Internal.Area} area 
 */
function recycleArea(areaManager, area) {
    areaManager.remove(area.getUuid())
    areaManager.setDirty()
}