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
        dungeonEventModel.finishAction(level, context, areaManager, true)
        SetDungeonObeliskState(level, area, 2)
        areaManager.remove(area.getUuid())
        areaManager.setDirty()
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
                    GetAreaPlayerList(level, area).forEach(player => {
                        // todo 本地化
                        player.tell('§c§l波次失败')
                        level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.trident.thunder', player.getSoundSource(), 0.5, 1)
                    })
                    
                    SetDungeonObeliskState(level, area, 3)
                    areaManager.remove(area.getUuid())
                    areaManager.setDirty()
                    return
                } else {
                    shouldFinishWave = true
                }
            }
            if (shouldFinishWave) {
                // 需要等待业务自行更改状态机
                let dungeonSuccess = waveAction.finishAction(level, context, areaManager, true)
                if (dungeonSuccess) {
                    dungeonEventModel.finishAction(level, context, areaManager, true)
                    SetDungeonObeliskState(level, area, 2)
                    areaManager.remove(area.getUuid())
                    areaManager.setDirty()
                    return
                }
                return
            }
            return
        case WaveStatusWaiting:
            // 等待中，不执行任何操作
            return
        default:
            // 未知状态，直接回收
            areaManager.remove(area.getUuid())
            areaManager.setDirty()
            SetDungeonObeliskState(level, area, 0)
            return
    }
})