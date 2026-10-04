// priority: 500
const VOID_ARENA_DIM = 'kubejs:void_arena'
const ARENA_BOSS_FLAG = 'kubejs_arena_boss'
const ARENA_EXIT_FLAG = 'kubejs_arena_exit'
const ARENA_BOSS_UUID = 'kubejs_arena_boss_uuid'
const ARENA_SPAWN_RADIUS = 16
const ARENA_SPAWN_Y = 64

// todo
function SelectVoidArenaBoss(player) {
    return 'minecraft:wither'
}

function RandomVoidArenaPos() {
    const span = ARENA_SPAWN_RADIUS * 2 + 1
    return {
        x: Math.floor(Math.random() * span) - ARENA_SPAWN_RADIUS,
        y: ARENA_SPAWN_Y,
        z: Math.floor(Math.random() * span) - ARENA_SPAWN_RADIUS
    }
}

function IsVoidArenaOccupied(level) {
    const uuidStr = level.persistentData.getString(ARENA_BOSS_UUID)
    if (!uuidStr) return false
    const existing = MAAUtils.getEntityByUUID(level, $UUID.fromString(uuidStr))
    return !!(existing && existing.isAlive() && existing.persistentData.getBoolean(ARENA_BOSS_FLAG))
}

function SpawnVoidArenaBoss(level, player) {
    const boss = level.createEntity(SelectVoidArenaBoss(player))
    if (!boss) return
    const isBossPart = boss.entityType.is(RelicsBossPartTagKey)
    if (!isBossPart) {
        boss.persistentData.putBoolean(ARENA_BOSS_FLAG, true)
        level.persistentData.putString(ARENA_BOSS_UUID, String(boss.uuid))
    }
    const pos = RandomVoidArenaPos()
    boss.setPos(pos.x, pos.y, pos.z)
    boss.spawn()
}

function SpawnVoidArenaExit(level) {
    const hole = level.createEntity('kubejs:wormhole')
    if (!hole) return
    hole.persistentData.putBoolean(ARENA_EXIT_FLAG, true)
    hole.setPos(0, 65, 8)
    hole.spawn()
}


MAAEvents.playerDimensionChange(event => {
    const level = event.player.level
    if (level.dimension != VOID_ARENA_DIM) return
    MAAUtils.forceLoadArena(level)
    if (!IsVoidArenaOccupied(level)) SpawnVoidArenaBoss(level, event.player)
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
    if (level.players.isEmpty()) {
        MAAUtils.unloadArena(level)
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
