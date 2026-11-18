// priority: 500
const VOID_ARENA_SUMMON_COUNT = 'kubejs_arena_summon_count_'
const VOID_ARENA_PORTAL_RADIUS = 6
const VOID_ARENA_PORTAL_HEIGHT = 3
const VOID_ARENA_PORTAL_TICKS = 20 * 60 * 10

function IncreaseVoidArenaSummon(model, player, entity) {
    const data = player.server.persistentData
    const countKey = VOID_ARENA_SUMMON_COUNT + model.id
    const count = data.getInt(countKey) + 1
    data.putInt(countKey, count)
    if (count < model.threshold) return
    if (!model.conditionFunc({ level: player.level, player: player, entity: entity })) return

    const arena = player.server.getLevel(VOID_ARENA_DIM)
    if (!IsVoidArenaReady(arena)) {
        data.remove(countKey)
        return
    }

    const pos = MAAUtils.findSafeSpawnPos(player.level, player.x, player.y, player.z, VOID_ARENA_PORTAL_RADIUS, VOID_ARENA_PORTAL_HEIGHT)
    if (pos) SpawnVoidArenaSummonPortal(player.level, model.id, pos)
    data.remove(countKey)
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
