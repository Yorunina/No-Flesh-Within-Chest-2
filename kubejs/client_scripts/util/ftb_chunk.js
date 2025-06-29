// priority: 3000
/**
 * 创建一个坐标点在FTBChunk
 * @param {BlockPos} position
 * @param {string} name
 * @param {number} color
 * @returns {void}
 */
function CreateWaypoint(position, name, color) {
    let mapDimension = $MapDimension.getCurrent().get()
    let waypoint = new $WaypointImpl($WaypointType.DEFAULT, mapDimension, position)
    waypoint.setName(name)
    waypoint.setColor(color)
    mapDimension.waypointManager.add(waypoint)
}


/**
 * 按照名字移除坐标点
 * @param {object || string} way
 */
function RemoveWaypointbyString(name) {
    let waypointManager = $MapDimension.getCurrent().waypointManager
    for (let waypoint of waypointManager) {
        if (waypoint.name == name) {
            waypointManager.remove(waypoint)
            return
        }
    }
}

/**
 * 通过位置移除坐标点
 * @param {$BlockPos} position
 */
function RemoveWaypointbyPos(position) {
    let waypointManager = $MapDimension.getCurrent().waypointManager
    for (let waypoint of waypointManager) {
        if (
            waypoint.x == position.x &&
            waypoint.y == position.y &&
            waypoint.z == position.z) {
            waypointManager.remove(waypoint)
            return
        }
    }
}