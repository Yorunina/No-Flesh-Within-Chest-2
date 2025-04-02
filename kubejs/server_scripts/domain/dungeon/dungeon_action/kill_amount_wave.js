// priority: 2000
/**
 * 创建一个击杀指定数量的波次
 * @param {number} maxKillAmount 需要击杀的数额
 * @param {number} waveTicks 波次总时长
 * @param {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager): void} entityGenerator 初始化时生成生物方法
 * @returns 
 */
function NewKillAmountWave(maxKillAmount, waveTicks, entityGenerator) {
    return new DungeonWaveModel()
        .setInitAction((level, context, areaManager) => {
            const customDataMap = context.customDataMap
            const area = context.area
            // 初始化bossBar展示
            let customBossEvent = new $CustomBossEvent(new ResourceLocation('kubejs:test'), Text.translatable('boss_bar.kubejs.dungeon.kill_amount_task.title.1', '0', maxKillAmount.toFixed(0)))
            customBossEvent.setProgress(1)
            customBossEvent.setColor($BossBarColor.GREEN)
            customDataMap.put('customBossEvent', customBossEvent)

            let aabb = area.getRoughAABB()
            let entityAABBList = level.getEntitiesWithin(aabb)
            let areaUuid = area.getUuid()
            let playerList = []
            entityAABBList.forEach(entity => {
                // 清空AABB里面可能的生物残留
                if (entity.getPersistentData().contains('relatedArea') && entity.getPersistentData().getUUID('relatedArea').equals(areaUuid)) {
                    entity.remove('discarded')
                    return
                }
                // 记录玩家信息
                if (entity.isPlayer() && entity instanceof $ServerPlayer) {
                    customBossEvent.addPlayer(entity)
                    playerList.push(entity)
                    return
                }
            })
            area.customDataMap.put('players', playerList)
            // 刷新实体击杀信息
            area.customDataMap.put('entityKilledMap', new Map())
            // 生成生物
            entityGenerator(level, context, areaManager)
            context.setCurrentWaveTime(waveTicks)
        })
        .setTickAction((level, context, areaManager) => {
            const customDataMap = context.customDataMap
            const area = context.area
            if (customDataMap.containsKey('customBossEvent')) {
                /**@type {Internal.CustomBossEvent} */
                let customBossEvent = customDataMap.get('customBossEvent')
                customBossEvent.setProgress((context.waveEndTicks - context.ticksExisted) / waveTicks)

                if (area.customDataMap.containsKey('entityKilledMap')) {
                    /**@type {Map<Internal.UUID, DamageSource>} */
                    let entityKilledMap = area.customDataMap.get('entityKilledMap')
                    customBossEvent.setName(Text.translate('boss_bar.kubejs.dungeon.kill_amount_task.title.1', entityKilledMap.size.toFixed(0), maxKillAmount.toFixed(0)))
                }
            }
        })
        .setFinishAction((level, context, areaManager, isWin) => {
            const customDataMap = context.customDataMap
            const area = context.area
            ClearEntityRemainInArea(level, area)
            if (isWin) {
                if (customDataMap.containsKey('customBossEvent')) {
                    SetWaveStatus(customDataMap, WaveStatusWaiting)
                    level.server.scheduleInTicks(20 * 5, () => {
                        /**@type {Internal.CustomBossEvent} */
                        let customBossEvent = customDataMap.get('customBossEvent')
                        customBossEvent.removeAllPlayers()
                        customDataMap.remove('customBossEvent')
                        SetWaveStatus(customDataMap, WaveStatusWaitInit)
                        context.waveId = context.waveId + 1
                    })
                }
            } else {
                /**@type {Internal.CustomBossEvent} */
                let customBossEvent = customDataMap.get('customBossEvent')
                if (customBossEvent) {
                    customBossEvent.removeAllPlayers()
                    customDataMap.remove('customBossEvent')
                }
            }
            return false
        })
        .setTickTester((level, context, areaManager) => {
            const area = context.area
            if (area.customDataMap.containsKey('entityKilledMap')) {
                /**@type {Map<any, any>} */
                let entityKilledMap = area.customDataMap.get('entityKilledMap')
                if (entityKilledMap.size >= maxKillAmount) {
                    return true
                }
            }
            return false
        })
        .setEndTester((level, context, areaManager) => {
            return false
        })
}




/**
 * 创建一个击杀指定数量的波次，怪物持续刷新
 * @param {number} maxKillAmount 需要击杀的数额
 * @param {number} waveTicks 波次总时长
 * @param {function(Internal.Level, Internal.SpawnMobAreaKubeEvent, LoquatAreaManager): void} entityGenerator 生物持续生成方法，需自行判断时间，秒级别
 * @returns 
 */
function NewContinousKillAmountWave(maxKillAmount, waveTicks, entityGenerator) {
    return new DungeonWaveModel()
        .setInitAction((level, context, areaManager) => {
            const customDataMap = context.customDataMap
            const area = context.area
            // 初始化bossBar展示
            let customBossEvent = new $CustomBossEvent(new ResourceLocation('kubejs:test'), Text.translatable('boss_bar.kubejs.dungeon.kill_amount_task.title.1', '0', maxKillAmount.toFixed(0)))
            customBossEvent.setProgress(1)
            customBossEvent.setColor($BossBarColor.GREEN)
            customDataMap.put('customBossEvent', customBossEvent)

            let aabb = area.getRoughAABB()
            let entityAABBList = level.getEntitiesWithin(aabb)
            let areaUuid = area.getUuid()
            let playerList = []
            entityAABBList.forEach(entity => {
                // 清空AABB里面可能的生物残留
                if (entity.getPersistentData().contains('relatedArea') && entity.getPersistentData().getUUID('relatedArea').equals(areaUuid)) {
                    entity.remove('discarded')
                    return
                }
                // 记录玩家信息
                if (entity.isPlayer() && entity instanceof $ServerPlayer) {
                    customBossEvent.addPlayer(entity)
                    playerList.push(entity)
                    return
                }
            })
            area.customDataMap.put('players', playerList)
            // 刷新实体击杀信息
            area.customDataMap.put('entityKilledMap', new Map())
            // 生成生物
            entityGenerator(level, context, areaManager)
            context.setCurrentWaveTime(waveTicks)
        })
        .setTickAction((level, context, areaManager) => {
            const customDataMap = context.customDataMap
            const area = context.area
            if (customDataMap.containsKey('customBossEvent')) {
                /**@type {Internal.CustomBossEvent} */
                let customBossEvent = customDataMap.get('customBossEvent')
                customBossEvent.setProgress((context.waveEndTicks - context.ticksExisted) / waveTicks)

                if (area.customDataMap.containsKey('entityKilledMap')) {
                    /**@type {Map<Internal.UUID, DamageSource>} */
                    let entityKilledMap = area.customDataMap.get('entityKilledMap')
                    customBossEvent.setName(Text.translate('boss_bar.kubejs.dungeon.kill_amount_task.title.1', entityKilledMap.size.toFixed(0), maxKillAmount.toFixed(0)))
                }
            }
            // 生成生物
            entityGenerator(level, context, areaManager)
        })
        .setFinishAction((level, context, areaManager, isWin) => {
            const customDataMap = context.customDataMap
            const area = context.area
            ClearEntityRemainInArea(level, area)
            if (isWin) {
                if (customDataMap.containsKey('customBossEvent')) {
                    SetWaveStatus(customDataMap, WaveStatusWaiting)
                    level.server.scheduleInTicks(20 * 5, () => {
                        /**@type {Internal.CustomBossEvent} */
                        let customBossEvent = customDataMap.get('customBossEvent')
                        customBossEvent.removeAllPlayers()
                        customDataMap.remove('customBossEvent')
                        SetWaveStatus(customDataMap, WaveStatusWaitInit)
                        context.waveId = context.waveId + 1
                    })
                }
            } else {
                /**@type {Internal.CustomBossEvent} */
                let customBossEvent = customDataMap.get('customBossEvent')
                if (customBossEvent) {
                    customBossEvent.removeAllPlayers()
                    customDataMap.remove('customBossEvent')
                }
            }
            return false
        })
        .setTickTester((level, context, areaManager) => {
            const area = context.area
            if (area.customDataMap.containsKey('entityKilledMap')) {
                /**@type {Map<any, any>} */
                let entityKilledMap = area.customDataMap.get('entityKilledMap')
                if (entityKilledMap.size >= maxKillAmount) {
                    return true
                }
            }
            return false
        })
        .setEndTester((level, context, areaManager) => {
            return false
        })
}