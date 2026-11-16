// priority: 500
const VOID_ARENA_DIM = 'kubejs:void_arena'
const ARENA_BOSS_FLAG = 'kubejs_arena_boss'
const ARENA_EXIT_FLAG = 'kubejs_arena_exit'
const ARENA_BOSS_UUID = 'kubejs_arena_boss_uuid'
const ARENA_PHASE = 'kubejs_arena_phase'
const ARENA_START_TIME = 'kubejs_arena_start_time'
const ARENA_EXIT_SPAWNED = 'kubejs_arena_exit_spawned'
const ARENA_PHASE_BATTLE = 'battle'
const ARENA_PHASE_VICTORY = 'victory'
const ARENA_TIMEOUT_TICKS = 20 * 60 * 10
const ARENA_BOSS_X = 32
const ARENA_BOSS_Y = 64
const ARENA_BOSS_Z = 32

function SelectVoidArenaBoss(player) {
    return 'minecraft:wither'
}

function SetVoidArenaPhase(level, phase) {
    level.persistentData.putString(ARENA_PHASE, phase)
}

function GetVoidArenaBoss(level) {
    const uuidStr = level.persistentData.getString(ARENA_BOSS_UUID)
    if (!uuidStr) return null
    return MAAUtils.getEntityByUUID(level, $UUID.fromString(uuidStr))
}

function IsVoidArenaOccupied(level) {
    const boss = GetVoidArenaBoss(level)
    return !!(boss && boss.isAlive() && boss.persistentData.getBoolean(ARENA_BOSS_FLAG))
}

function SpawnVoidArenaBoss(level, player) {
    const boss = level.createEntity(SelectVoidArenaBoss(player))
    if (!boss) return false
    const isBossPart = boss.entityType.is(RelicsBossPartTagKey)
    if (!isBossPart) {
        boss.persistentData.putBoolean(ARENA_BOSS_FLAG, true)
        level.persistentData.putString(ARENA_BOSS_UUID, String(boss.uuid))
    }
    boss.setPos(ARENA_BOSS_X, ARENA_BOSS_Y, ARENA_BOSS_Z)
    boss.spawn()
    return true
}

function SpawnVoidArenaExit(level) {
    if (level.persistentData.getBoolean(ARENA_EXIT_SPAWNED)) return
    const hole = level.createEntity('kubejs:wormhole')
    if (!hole) return
    hole.persistentData.putBoolean(ARENA_EXIT_FLAG, true)
    hole.setPos(0, 65, 8)
    hole.spawn()
    level.persistentData.putBoolean(ARENA_EXIT_SPAWNED, true)
}

function ClearVoidArena(level) {
    const boss = GetVoidArenaBoss(level)
    if (boss && boss.isAlive()) boss.discard()
    level.persistentData.remove(ARENA_BOSS_UUID)
    level.persistentData.remove(ARENA_PHASE)
    level.persistentData.remove(ARENA_START_TIME)
    level.persistentData.remove(ARENA_EXIT_SPAWNED)
    MAAUtils.unloadArena(level)
}

function BeginVoidArena(level, player) {
    MAAUtils.forceLoadArena(level)
    if (IsVoidArenaOccupied(level)) return
    const oldPhase = level.persistentData.getString(ARENA_PHASE)
    if (oldPhase == ARENA_PHASE_VICTORY) return
    if (!SpawnVoidArenaBoss(level, player)) return
    SetVoidArenaPhase(level, ARENA_PHASE_BATTLE)
    level.persistentData.putLong(ARENA_START_TIME, level.gameTime)
}

function TickVoidArena(level) {
    if (!level) return
    if (level.players.isEmpty()) {
        const data = level.persistentData
        if (data.contains(ARENA_BOSS_UUID) || data.getString(ARENA_PHASE) == ARENA_PHASE_VICTORY || data.getBoolean(ARENA_EXIT_SPAWNED)) ClearVoidArena(level)
        return
    }
    const phase = level.persistentData.getString(ARENA_PHASE)
    if (phase != ARENA_PHASE_BATTLE) return
    if (!IsVoidArenaOccupied(level)) {
        ClearVoidArena(level)
        return
    }
    const startTime = level.persistentData.getLong(ARENA_START_TIME)
    if (startTime && level.gameTime - startTime >= ARENA_TIMEOUT_TICKS) {
        const boss = GetVoidArenaBoss(level)
        if (boss && boss.isAlive()) boss.discard()
        level.persistentData.remove(ARENA_BOSS_UUID)
        SetVoidArenaPhase(level, ARENA_PHASE_VICTORY)
        SpawnVoidArenaExit(level)
    }
}

MAAEvents.playerDimensionChange(event => {
    const level = event.player.level
    if (level.dimension != VOID_ARENA_DIM) return
    BeginVoidArena(level, event.player)
})

ServerEvents.tick(event => {
    if (event.server.tickCount % 20 != 0) return
    TickVoidArena(event.server.getLevel(VOID_ARENA_DIM))
})

PlayerEvents.respawned(event => {
    const player = event.player
    if (player.level.dimension != VOID_ARENA_DIM) return
    TeleportFromWormholeExit(player)
})

EntityEvents.spawned(event => {
    const entity = event.entity
    if (!entity || !entity.isLiving() || entity.isPlayer()) return
    if (entity.level.dimension != VOID_ARENA_DIM) return
    const isBossPart = entity.entityType.is(RelicsBossPartTagKey)
    const isBoss = entity.entityType.is(RelicsBossTagKey)
    if (isBossPart) {
        entity.persistentData.remove(ARENA_BOSS_FLAG)
        return
    }
    if (isBoss) entity.persistentData.putBoolean(ARENA_BOSS_FLAG, true)
})

EntityEvents.death(event => {
    const entity = event.entity
    if (!entity.persistentData.getBoolean(ARENA_BOSS_FLAG)) return
    if (entity.entityType.is(RelicsBossPartTagKey)) return
    const level = entity.level
    if (level.dimension != VOID_ARENA_DIM) return
    const uuidStr = level.persistentData.getString(ARENA_BOSS_UUID)
    if (uuidStr && String(entity.uuid) != uuidStr) return
    level.persistentData.remove(ARENA_BOSS_UUID)
    SetVoidArenaPhase(level, ARENA_PHASE_VICTORY)
    if (level.players.isEmpty()) {
        ClearVoidArena(level)
        return
    }
    SpawnVoidArenaExit(level)
})

BlockEvents.placed(event => {
    if (event.level.dimension != VOID_ARENA_DIM) return
    const player = event.player
    if (!player || player.isCreative()) return
    event.cancel()
})
