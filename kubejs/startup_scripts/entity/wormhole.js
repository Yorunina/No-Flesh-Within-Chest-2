// priority: 1000
const VOID_ARENA_DIM = 'kubejs:void_arena'
const VOID_ARENA_SERVER_PHASE = 'kubejs_void_arena_phase'
const VOID_ARENA_SERVER_UNTIL = 'kubejs_void_arena_until'
const ARENA_PHASE = 'kubejs_arena_phase'
const ARENA_PHASE_WAITING = 'waiting'
const ARENA_PHASE_ENTRY_OPEN = 'entry_open'
const ARENA_PHASE_EXIT = 'exit'
const ARENA_ENTRY_TICKS = 20 * 60
const ARENA_ENTRY_DIM = 'kubejs_arena_entry_dim'
const ARENA_ENTRY_X = 'kubejs_arena_entry_x'
const ARENA_ENTRY_Y = 'kubejs_arena_entry_y'
const ARENA_ENTRY_Z = 'kubejs_arena_entry_z'
const ARENA_ENTRY_YAW = 'kubejs_arena_entry_yaw'
const ARENA_ENTRY_PITCH = 'kubejs_arena_entry_pitch'
const WORMHOLE_COOL = 'kubejs_wormhole_cool'
const WORMHOLE_COOLDOWN_TICKS = 40
const ARENA_PLAYER_X = 0
const ARENA_PLAYER_Y = 64
const ARENA_PLAYER_Z = 0

function VoidArenaGameTime(player) {
    return player.server.getLevel('minecraft:overworld').gameTime
}

function MarkWormholeCool(player) {
    player.persistentData.putLong(WORMHOLE_COOL, VoidArenaGameTime(player) + WORMHOLE_COOLDOWN_TICKS)
}

function IsWormholeCooling(player) {
    return VoidArenaGameTime(player) < player.persistentData.getLong(WORMHOLE_COOL)
}

function SaveWormholeEntry(level, player) {
    const data = level.persistentData
    if (data.getString(ARENA_ENTRY_DIM)) return
    data.putString(ARENA_ENTRY_DIM, String(player.level.dimension))
    data.putDouble(ARENA_ENTRY_X, player.x)
    data.putDouble(ARENA_ENTRY_Y, player.y)
    data.putDouble(ARENA_ENTRY_Z, player.z)
    data.putFloat(ARENA_ENTRY_YAW, player.yaw)
    data.putFloat(ARENA_ENTRY_PITCH, player.pitch)
}

function TeleportFromWormholeExit(player, level) {
    const data = level.persistentData
    const dim = data.getString(ARENA_ENTRY_DIM)
    if (!dim) return
    player.teleportTo(dim, data.getDouble(ARENA_ENTRY_X), data.getDouble(ARENA_ENTRY_Y), data.getDouble(ARENA_ENTRY_Z), data.getFloat(ARENA_ENTRY_YAW), data.getFloat(ARENA_ENTRY_PITCH))
    MarkWormholeCool(player)
}

function TeleportIntoVoidArena(player) {
    const server = player.server
    const arena = server.getLevel(VOID_ARENA_DIM)
    if (!arena) return
    SaveWormholeEntry(arena, player)
    if (server.persistentData.getString(VOID_ARENA_SERVER_PHASE) == ARENA_PHASE_WAITING) {
        server.persistentData.putString(VOID_ARENA_SERVER_PHASE, ARENA_PHASE_ENTRY_OPEN)
        server.persistentData.putLong(VOID_ARENA_SERVER_UNTIL, server.getOverworld().gameTime + ARENA_ENTRY_TICKS)
    }
    player.teleportTo(VOID_ARENA_DIM, ARENA_PLAYER_X, ARENA_PLAYER_Y, ARENA_PLAYER_Z, player.yaw, player.pitch)
    MarkWormholeCool(player)
}

function WormholeTick(entity) {
    const level = entity.level
    if (level.isClientSide()) return
    const server = level.server
    const players = level.getEntitiesOfClass($Player, entity.getBoundingBox().inflate(1.5))

    if (level.dimension == VOID_ARENA_DIM) {
        if (level.persistentData.getString(ARENA_PHASE) != ARENA_PHASE_EXIT) {
            entity.discard()
            return
        }
        players.forEach(player => {
            if (!IsWormholeCooling(player)) TeleportFromWormholeExit(player, level)
        })
        return
    }

    const phase = server.persistentData.getString(VOID_ARENA_SERVER_PHASE)
    if (phase != ARENA_PHASE_WAITING && phase != ARENA_PHASE_ENTRY_OPEN) {
        entity.discard()
        return
    }
    players.forEach(player => {
        if (!IsWormholeCooling(player)) TeleportIntoVoidArena(player)
    })
}

StartupEvents.registry('entity_type', event => {
    event.create('wormhole', 'entityjs:nonliving')
        .sized(3.0, 3.0)
        .clientTrackingRange(100)
        .fireImmune(true)
        .isAttackable(false)
        .isPushable(false)
        .isPickable(false)
        .shouldRenderAtSqrDistance(ctx => true)
        .tick(WormholeTick)
        .onAddedToWorld(entity => {
            entity.noGravity = true
            entity.noCulling = true
        })
        .textureResource(() => 'kubejs:textures/entity/placeholder.png')
})

MAAUtils.registerShaderEntity('kubejs:wormhole', 'Wormhole')