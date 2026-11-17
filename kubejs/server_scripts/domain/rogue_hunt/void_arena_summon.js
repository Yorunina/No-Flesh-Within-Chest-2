// priority: 500
const VOID_ARENA_SUMMON_COUNT = 'kubejs_arena_summon_count_'
const VOID_ARENA_SUMMON_PENDING = 'kubejs_arena_summon_pending_'
const VOID_ARENA_PORTAL_RADIUS = 6
const VOID_ARENA_PORTAL_HEIGHT = 3
const VOID_ARENA_PORTAL_TICKS = 20 * 60 * 10

function IncreaseVoidArenaSummon(model, player, entity) {
    const data = player.server.persistentData
    const pendingKey = VOID_ARENA_SUMMON_PENDING + model.id
    if (data.contains(pendingKey)) return
    const countKey = VOID_ARENA_SUMMON_COUNT + model.id
    const count = data.getInt(countKey) + 1
    data.putInt(countKey, count)
    if (count < model.threshold) return
    if (!model.conditionFunc({ level: player.level, player: player, entity: entity })) return
    const pending = new $CompoundTag()
    pending.putString('dimension', String(player.level.dimension))
    pending.putDouble('x', player.x)
    pending.putDouble('y', player.y)
    pending.putDouble('z', player.z)
    pending.putUUID('player', player.uuid)
    data.put(pendingKey, pending)
}

function SpawnVoidArenaSummonPortal(level, id, pos) {
    const hole = level.createEntity('kubejs:wormhole')
    if (!hole) return false
    hole.persistentData.putString(VOID_ARENA_SUMMON_ID, id)
    hole.persistentData.putInt('kubejs_arena_despawn', VOID_ARENA_PORTAL_TICKS)
    hole.setPos(pos.x + 0.5, pos.y, pos.z + 0.5)
    hole.spawn()
    return true
}

function GetVoidArenaSummonPlayer(server, uuid) {
    let player = null
    server.playerList.players.forEach(pPlayer => {
        if (String(pPlayer.uuid) == String(uuid)) player = pPlayer
    })
    return player
}

function TrySpawnVoidArenaSummon(server, model) {
    const data = server.persistentData
    const pendingKey = VOID_ARENA_SUMMON_PENDING + model.id
    if (!data.contains(pendingKey)) return
    const arena = server.getLevel(VOID_ARENA_DIM)
    if (arena && IsVoidArenaOccupied(arena)) return
    const pending = data.getCompound(pendingKey)
    const level = server.getLevel(pending.getString('dimension'))
    if (!level) return
    if (model.canStartFunc) {
        const context = { level: level, player: GetVoidArenaSummonPlayer(server, pending.getUUID('player')), entity: null }
        if (!model.canStartFunc(context)) return
    }
    const pos = MAAUtils.findSafeSpawnPos(level, pending.getDouble('x'), pending.getDouble('y'), pending.getDouble('z'), VOID_ARENA_PORTAL_RADIUS, VOID_ARENA_PORTAL_HEIGHT)
    if (!pos) return
    if (!SpawnVoidArenaSummonPortal(level, model.id, pos)) return
    data.remove(pendingKey)
    data.remove(VOID_ARENA_SUMMON_COUNT + model.id)
}

EntityEvents.death(event => {
    const entity = event.entity
    if (!entity || entity.isPlayer()) return
    if (entity.level.dimension == VOID_ARENA_DIM) return
    const killer = event.source.actual ? event.source.actual : entity.getKillCredit()
    if (!killer || !killer.isPlayer()) return
    for (const id in VoidArenaSummonMap) {
        const model = VoidArenaSummonMap[id]
        if (!model.matchFunc(entity)) continue
        IncreaseVoidArenaSummon(model, killer, entity)
    }
})

ServerEvents.tick(event => {
    if (event.server.tickCount % 20 != 0) return
    for (const id in VoidArenaSummonMap) {
        TrySpawnVoidArenaSummon(event.server, VoidArenaSummonMap[id])
    }
})
