// priority: 500
const VOID_ARENA_SUMMON_COUNT = 'arena_summon_count_'
const VOID_ARENA_PORTAL_RADIUS = 6
const VOID_ARENA_PORTAL_HEIGHT = 3
const VOID_ARENA_PORTAL_TICKS = 20 * 60 * 3

function IncreaseVoidArenaSummon(model, player, entity) {
    const data = player.server.persistentData
    const countKey = VOID_ARENA_SUMMON_COUNT + model.summonId
    const count = data.getInt(countKey) + 1
    if (count < model.threshold) {
        data.putInt(countKey, count)
        return
    }
    data.remove(countKey)
    if (!model.conditionFunc({ level: player.level, player: player, entity: entity })) return
    const pos = MAAUtils.findSafeSpawnPos(player.level, player.x, player.y, player.z, VOID_ARENA_PORTAL_RADIUS, VOID_ARENA_PORTAL_HEIGHT)
    if (pos) SpawnVoidArenaSummonPortal(player.server, player.level, model, pos)
}

function SpawnVoidArenaSummonPortal(server, level, model, pos) {
    const arena = server.getLevel(VOID_ARENA_DIM)
    if (!model || !model.createBossFunc) return false
    if (!arena || arena.persistentData.getString(ARENA_PHASE)) return false
    if (server.persistentData.getString(VOID_ARENA_SERVER_PHASE)) return false
    const hole = level.createEntity('kubejs:wormhole')
    if (!hole) return false
    arena.persistentData.putString(ARENA_SUMMON_ID, model.id)
    hole.setPos(pos.x + 0.5, pos.y, pos.z + 0.5)
    hole.spawn()
    server.persistentData.putString(VOID_ARENA_SERVER_PHASE, ARENA_PHASE_WAITING)
    server.persistentData.putLong(VOID_ARENA_SERVER_UNTIL, server.getOverworld().gameTime + VOID_ARENA_PORTAL_TICKS)
    return true
}

EntityEvents.death(event => {
    const entity = event.entity
    if (!entity || entity.isPlayer()) return
    if (entity.level.dimension == VOID_ARENA_DIM || entity.level.dimension == ROGUE_HUNT_DIM) return
    const killer = event.source.actual ? event.source.actual : entity.getKillCredit()
    if (!killer || !killer.isPlayer()) return
    for (const id in VoidArenaSummonMap) {
        let model = VoidArenaSummonMap[id]
        if (!model.entityKilledFunc({ level: entity.level, player: killer, entity: entity })) continue
        IncreaseVoidArenaSummon(model, killer, entity)
    }
})