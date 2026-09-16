// priority: 1000
const VOID_ARENA_DIM = 'kubejs:void_arena'
const ARENA_EXIT_FLAG = 'kubejs_arena_exit'
const ARENA_DESPAWN = 'kubejs_arena_despawn'
const ARENA_RETURN_DIM = 'kubejs_arena_return_dim'
const ARENA_RETURN_X = 'kubejs_arena_return_x'
const ARENA_RETURN_Y = 'kubejs_arena_return_y'
const ARENA_RETURN_Z = 'kubejs_arena_return_z'
const ARENA_RETURN_YAW = 'kubejs_arena_return_yaw'
const ARENA_RETURN_PITCH = 'kubejs_arena_return_pitch'
const WORMHOLE_COOL = 'kubejs_wormhole_cool'
const ENTRY_BASE_TICKS = 200
const TELEPORT_COOLDOWN = 40

function VoidArenaGameTime(player) {
    return player.server.getLevel('minecraft:overworld').gameTime
}

function MarkWormholeCool(player) {
    player.persistentData.putLong(WORMHOLE_COOL, VoidArenaGameTime(player) + TELEPORT_COOLDOWN)
}

function IsWormholeCooling(player) {
    return VoidArenaGameTime(player) < player.persistentData.getLong(WORMHOLE_COOL)
}

function SaveArenaReturnPoint(player) {
    if (player.level.dimension == VOID_ARENA_DIM) return
    const data = player.persistentData
    data.putString(ARENA_RETURN_DIM, String(player.level.dimension))
    data.putDouble(ARENA_RETURN_X, player.x)
    data.putDouble(ARENA_RETURN_Y, player.y)
    data.putDouble(ARENA_RETURN_Z, player.z)
    data.putFloat(ARENA_RETURN_YAW, player.yaw)
    data.putFloat(ARENA_RETURN_PITCH, player.pitch)
}

function TeleportFromWormholeExit(player) {
    const data = player.persistentData
    const dim = data.getString(ARENA_RETURN_DIM)
    if (!dim) {
        const spawn = player.server.getLevel('minecraft:overworld').sharedSpawnPos
        player.teleportTo('minecraft:overworld', spawn.x, spawn.y, spawn.z, 0, 0)
    } else {
        player.teleportTo(dim, data.getDouble(ARENA_RETURN_X), data.getDouble(ARENA_RETURN_Y), data.getDouble(ARENA_RETURN_Z), data.getFloat(ARENA_RETURN_YAW), data.getFloat(ARENA_RETURN_PITCH))
    }
    MarkWormholeCool(player)
}

function TeleportIntoVoidArena(player, hole) {
    SaveArenaReturnPoint(player)
    player.teleportTo(VOID_ARENA_DIM, 0, 64, 0, player.yaw, player.pitch)
    const data = hole.persistentData
    data.putInt(ARENA_DESPAWN, data.contains(ARENA_DESPAWN) ? data.getInt(ARENA_DESPAWN) + ENTRY_BASE_TICKS : ENTRY_BASE_TICKS)
    MarkWormholeCool(player)
}

function WormholeTick(entity) {
    const level = entity.level
    if (level.isClientSide()) return
    const data = entity.persistentData
    const players = level.getEntitiesOfClass($Player, entity.getBoundingBox().inflate(1.5))

    if (data.getBoolean(ARENA_EXIT_FLAG)) {
        players.forEach(player => {
            if (!IsWormholeCooling(player)) TeleportFromWormholeExit(player)
        })
        if (level.players.isEmpty()) {
            MAAUtils.unloadArena(level)
            entity.discard()
        }
        return
    }

    players.forEach(player => {
        if (!IsWormholeCooling(player)) TeleportIntoVoidArena(player, entity)
    })

    if (!data.contains(ARENA_DESPAWN)) return
    const left = data.getInt(ARENA_DESPAWN) - 1
    if (left <= 0) entity.discard()
    else data.putInt(ARENA_DESPAWN, left)
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
