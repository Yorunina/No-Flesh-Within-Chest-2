// priority: 800
const DungeonStructureRadius = 32
const DungeonStructureHeight = 10
/**
 * 根据中心位置生成一个区域
 * @param {Internal.Level} level 
 * @param {Internal.Player} player
 * @param {BlockPos} centerPos 
 * @returns {Internal.Area}
 */
function GenDungeonLevelArea(level, centerPos) {
    let leftConner = centerPos.offset(-DungeonStructureRadius, -3, -DungeonStructureRadius)
    let rightConner = centerPos.offset(DungeonStructureRadius, DungeonStructureHeight, DungeonStructureRadius)
    let aabb = AABB.ofBlocks(
        leftConner,
        rightConner
    )

    // let players = level.getEntitiesOfClass($Player, aabb, _ => true)
    let players = level.getPlayers()
    if (players.length == 0) return null

    let area = new $AABBArea(aabb)
    area.setUuid($UUID.randomUUID())
    let levelManager = LoquatAreaManager.of(level)
    if (levelManager.byPosition(centerPos).length > 0) return null
    if (levelManager.contains(area)) return null
    levelManager.add(area)

    let entityAABBList = level.getEntitiesWithin(aabb)
    let areaUuid = area.getUuid()
    entityAABBList.forEach(entity => {
        // 清空AABB里面可能的生物残留
        if (entity.getPersistentData().contains('relatedArea') && entity.getPersistentData().getUUID('relatedArea').equals(areaUuid)) {
            entity.remove('discarded')
            return
        }
    })
    let zoneSideLength = Math.floor(DungeonStructureRadius / Math.sqrt(2))
    let zoneLeftConner = centerPos.offset(-zoneSideLength, -1, -zoneSideLength)
    let zoneRightConner = centerPos.offset(zoneSideLength, 6, zoneSideLength)
    let zoneAABB = AABB.ofBlocks(
        zoneLeftConner,
        zoneRightConner
    )
    area.getZones().put('spawnZone', new $Zone([zoneAABB]))
    levelManager.setChanged([area])
    let restrictions = $RestrictInstance.of(level, '*')
    $RestrictBehavior.VALUES.forEach(behavior => {
        restrictions.restrict(area, behavior, true)
    })

    levelManager.setDirty()
    players.forEach(player => {
        $SSyncRestrictionPacket.sync(player)
    })
    return area
}