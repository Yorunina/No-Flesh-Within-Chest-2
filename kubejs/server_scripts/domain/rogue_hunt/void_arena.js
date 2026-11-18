// priority: 500
const VOID_ARENA_DIM = 'kubejs:void_arena'
const VOID_ARENA_SERVER_PHASE = 'kubejs_void_arena_phase'
const VOID_ARENA_SERVER_UNTIL = 'kubejs_void_arena_until'
const VOID_ARENA_SERVER_SUMMON_ID = 'kubejs_void_arena_summon_id'
const ARENA_BOSS_FLAG = 'kubejs_arena_boss'
const ARENA_BOSS_UUID = 'kubejs_arena_boss_uuid'
const ARENA_PHASE = 'kubejs_arena_phase'
const ARENA_RETURN_TIME = 'kubejs_arena_return_time'
const ARENA_SUMMON_ID = 'kubejs_arena_summon_id'
const ARENA_ENTRY_DIM = 'kubejs_arena_entry_dim'
const ARENA_ENTRY_X = 'kubejs_arena_entry_x'
const ARENA_ENTRY_Y = 'kubejs_arena_entry_y'
const ARENA_ENTRY_Z = 'kubejs_arena_entry_z'
const ARENA_ENTRY_YAW = 'kubejs_arena_entry_yaw'
const ARENA_ENTRY_PITCH = 'kubejs_arena_entry_pitch'
const ARENA_PHASE_WAITING = 'waiting'
const ARENA_PHASE_BATTLE = 'battle'
const ARENA_PHASE_EXIT = 'exit'
const ARENA_EXIT_TICKS = 20 * 60
const ARENA_BOSS_X = 32
const ARENA_BOSS_Y = 64
const ARENA_BOSS_Z = 32

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

function IsVoidArenaReady(server, level) {
    return !!level
        && !server.persistentData.getString(VOID_ARENA_SERVER_PHASE)
        && !level.persistentData.getString(ARENA_PHASE)
        && !IsVoidArenaOccupied(level)
}

function ClearVoidArenaServer(server) {
    server.persistentData.remove(VOID_ARENA_SERVER_PHASE)
    server.persistentData.remove(VOID_ARENA_SERVER_UNTIL)
    server.persistentData.remove(VOID_ARENA_SERVER_SUMMON_ID)
}

function SaveVoidArenaEntry(level, player) {
    const data = player.persistentData
    const arena = level.persistentData
    arena.putString(ARENA_ENTRY_DIM, data.getString('kubejs_arena_return_dim'))
    arena.putDouble(ARENA_ENTRY_X, data.getDouble('kubejs_arena_return_x'))
    arena.putDouble(ARENA_ENTRY_Y, data.getDouble('kubejs_arena_return_y'))
    arena.putDouble(ARENA_ENTRY_Z, data.getDouble('kubejs_arena_return_z'))
    arena.putFloat(ARENA_ENTRY_YAW, data.getFloat('kubejs_arena_return_yaw'))
    arena.putFloat(ARENA_ENTRY_PITCH, data.getFloat('kubejs_arena_return_pitch'))
}

function ClearVoidArenaReturnPoint(player) {
    const data = player.persistentData
    data.remove('kubejs_arena_return_dim')
    data.remove('kubejs_arena_return_x')
    data.remove('kubejs_arena_return_y')
    data.remove('kubejs_arena_return_z')
    data.remove('kubejs_arena_return_yaw')
    data.remove('kubejs_arena_return_pitch')
}

function TeleportToPlayerRespawn(player) {
    const respawnPos = player.getRespawnPosition()
    const respawnDim = respawnPos ? String(player.getRespawnDimension()) : ''
    const respawnLevel = respawnDim ? player.server.getLevel(respawnDim) : null
    if (respawnPos && respawnLevel) {
        player.teleportTo(respawnDim, respawnPos.x + 0.5, respawnPos.y, respawnPos.z + 0.5, player.getRespawnAngle(), 0)
    } else {
        const spawn = player.server.getLevel('minecraft:overworld').sharedSpawnPos
        player.teleportTo('minecraft:overworld', spawn.x + 0.5, spawn.y, spawn.z + 0.5, 0, 0)
    }
    ClearVoidArenaReturnPoint(player)
}

function SpawnVoidArenaBoss(level, player) {
    const summonId = player.persistentData.getString('kubejs_arena_summon')
    const summon = summonId ? VoidArenaSummonMap[summonId] : null
    const boss = summon && summon.createBossFunc
        ? summon.createBossFunc({ level: level, player: player, entity: null })
        : level.createEntity('minecraft:wither')
    if (!boss) return false
    player.persistentData.remove('kubejs_arena_summon')
    if (summonId) level.persistentData.putString(ARENA_SUMMON_ID, summonId)
    const isBossPart = boss.entityType.is(RelicsBossPartTagKey)
    if (isBossPart) return false
    boss.persistentData.putBoolean(ARENA_BOSS_FLAG, true)
    level.persistentData.putString(ARENA_BOSS_UUID, String(boss.uuid))
    boss.setPos(ARENA_BOSS_X, ARENA_BOSS_Y, ARENA_BOSS_Z)
    boss.spawn()
    return true
}

function ClearVoidArena(level) {
    const boss = GetVoidArenaBoss(level)
    if (boss && boss.isAlive()) boss.discard()
    level.persistentData.remove(ARENA_BOSS_UUID)
    level.persistentData.remove(ARENA_PHASE)
    level.persistentData.remove(ARENA_RETURN_TIME)
    level.persistentData.remove(ARENA_SUMMON_ID)
    level.persistentData.remove(ARENA_ENTRY_DIM)
    level.persistentData.remove(ARENA_ENTRY_X)
    level.persistentData.remove(ARENA_ENTRY_Y)
    level.persistentData.remove(ARENA_ENTRY_Z)
    level.persistentData.remove(ARENA_ENTRY_YAW)
    level.persistentData.remove(ARENA_ENTRY_PITCH)
    if (level.players.isEmpty()) MAAUtils.unloadArena(level)
}

function BeginVoidArena(level, player) {
    const server = player.server
    MAAUtils.forceLoadArena(level)
    if (!level.persistentData.getString(ARENA_ENTRY_DIM) && player.persistentData.getString('kubejs_arena_return_dim')) SaveVoidArenaEntry(level, player)
    if (server.persistentData.getString(VOID_ARENA_SERVER_PHASE) == ARENA_PHASE_WAITING) {
        SaveVoidArenaEntry(level, player)
        ClearVoidArenaServer(server)
    }
    if (IsVoidArenaOccupied(level)) return
    const oldPhase = level.persistentData.getString(ARENA_PHASE)
    if (oldPhase) return
    if (!SpawnVoidArenaBoss(level, player)) {
        TeleportToPlayerRespawn(player)
        ClearVoidArena(level)
        return
    }
    SetVoidArenaPhase(level, ARENA_PHASE_BATTLE)
}

function SpawnVoidArenaExit(level, pos) {
    const hole = level.createEntity('kubejs:wormhole')
    if (!hole) return false
    const data = level.persistentData
    hole.persistentData.putBoolean('kubejs_arena_exit', true)
    hole.persistentData.putString('kubejs_arena_exit_dim', data.getString(ARENA_ENTRY_DIM))
    hole.persistentData.putDouble('kubejs_arena_exit_x', data.getDouble(ARENA_ENTRY_X))
    hole.persistentData.putDouble('kubejs_arena_exit_y', data.getDouble(ARENA_ENTRY_Y))
    hole.persistentData.putDouble('kubejs_arena_exit_z', data.getDouble(ARENA_ENTRY_Z))
    hole.persistentData.putFloat('kubejs_arena_exit_yaw', data.getFloat(ARENA_ENTRY_YAW))
    hole.persistentData.putFloat('kubejs_arena_exit_pitch', data.getFloat(ARENA_ENTRY_PITCH))
    hole.persistentData.putInt('kubejs_arena_despawn', ARENA_EXIT_TICKS)
    hole.setPos(pos.x, pos.y, pos.z)
    hole.spawn()
    return true
}

function BeginVoidArenaExit(level, pos) {
    SetVoidArenaPhase(level, ARENA_PHASE_EXIT)
    level.persistentData.putLong(ARENA_RETURN_TIME, level.gameTime + ARENA_EXIT_TICKS)
    SpawnVoidArenaExit(level, pos)
}

function ReturnVoidArenaPlayers(level) {
    const data = level.persistentData
    const dim = data.getString(ARENA_ENTRY_DIM)
    const players = level.players.toArray()
    players.forEach(player => {
        if (player.isAlive() && dim) {
            player.teleportTo(dim, data.getDouble(ARENA_ENTRY_X), data.getDouble(ARENA_ENTRY_Y), data.getDouble(ARENA_ENTRY_Z), data.getFloat(ARENA_ENTRY_YAW), data.getFloat(ARENA_ENTRY_PITCH))
            ClearVoidArenaReturnPoint(player)
        }
    })
}

function MoveVoidArenaItems(level) {
    const data = level.persistentData
    const dim = data.getString(ARENA_ENTRY_DIM)
    const target = dim ? level.server.getLevel(dim) : null
    if (!target) return
    const items = level.getEntitiesOfClass($ItemEntity, AABB.of(-30000000, -64, -30000000, 30000000, 320, 30000000))
    items.forEach(item => {
        const moved = new $ItemEntity(target, data.getDouble(ARENA_ENTRY_X), data.getDouble(ARENA_ENTRY_Y), data.getDouble(ARENA_ENTRY_Z), item.getItem().copy())
        moved.setDefaultPickUpDelay()
        moved.spawn()
        item.discard()
    })
}

function TickVoidArenaServer(server) {
    const phase = server.persistentData.getString(VOID_ARENA_SERVER_PHASE)
    if (phase != ARENA_PHASE_WAITING) return
    if (server.getOverworld().gameTime >= server.persistentData.getLong(VOID_ARENA_SERVER_UNTIL)) ClearVoidArenaServer(server)
}

function TickVoidArena(level) {
    if (!level) return
    const phase = level.persistentData.getString(ARENA_PHASE)
    if (phase == ARENA_PHASE_EXIT) {
        if (level.gameTime >= level.persistentData.getLong(ARENA_RETURN_TIME)) {
            ReturnVoidArenaPlayers(level)
            MoveVoidArenaItems(level)
            ClearVoidArena(level)
        }
        return
    }
    if (level.players.isEmpty()) {
        if (phase == ARENA_PHASE_BATTLE) ClearVoidArena(level)
        return
    }
    if (phase != ARENA_PHASE_BATTLE) return
    if (!IsVoidArenaOccupied(level)) {
        level.players.toArray().forEach(player => {
            if (player.isAlive()) TeleportToPlayerRespawn(player)
        })
        ClearVoidArena(level)
    }
}

MAAEvents.playerDimensionChange(event => {
    const player = event.player
    const level = player.level
    if (level.dimension == VOID_ARENA_DIM) BeginVoidArena(level, player)
})

ServerEvents.tick(event => {
    if (event.server.tickCount % 20 != 0) return
    TickVoidArenaServer(event.server)
    TickVoidArena(event.server.getLevel(VOID_ARENA_DIM))
})

PlayerEvents.respawned(event => {
    const player = event.player
    if (player.level.dimension == VOID_ARENA_DIM) TeleportToPlayerRespawn(player)
})

PlayerEvents.loggedIn(event => {
    const player = event.player
    if (player.level.dimension != VOID_ARENA_DIM) return
    if (!player.level.persistentData.getString(ARENA_PHASE)) TeleportToPlayerRespawn(player)
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
    const summonId = level.persistentData.getString(ARENA_SUMMON_ID)
    const summon = summonId ? VoidArenaSummonMap[summonId] : null
    if (summon && summon.lootFunc) summon.lootFunc({ level: level, player: null, entity: entity })
    if (level.players.isEmpty()) {
        ClearVoidArena(level)
        return
    }
    BeginVoidArenaExit(level, entity.blockPosition())
})

BlockEvents.placed(event => {
    if (event.level.dimension != VOID_ARENA_DIM) return
    const player = event.player
    if (!player || player.isCreative()) return
    event.cancel()
})