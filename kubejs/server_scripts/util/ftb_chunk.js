// priority: 3000

/**
 * 创建一个坐标点在FTBChunk
 * @param {Internal.ServerPlayer} player
 * @param {BlockPos} blockPos
 * @param {string} name
 * @param {number} color
 * @returns {void}
 */
function CreateWaypoint(player, blockPos, name, color) {
    player.sendData('ftb_chunk_waypoint', { 'x': blockPos.x, 'y': blockPos.y, 'z': blockPos.z, 'name': name, 'color': color })
}