// priority: 2999
/**
 * 此方法用于在某些场景下，服务端事件优先于客户端加载执行，导致entity.sendData在connection false的情况下被调用
 * 通过Player loggin方法等待到对应UUID的玩家进入后，触发队列发送消息统一处理
 * 此类场景通常出现在：玩家胸腔通过from tag初始化时、玩家实体生成时
 */
/** @type {Map<string,{channel:string,data:Internal.CompoundTag}[]>} */
const S2CDataQueue = new Map()

/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @param {string} channel 
 */
function EnqueueSendData(player, channel, data) {
    if (player.connection) {
        player.sendData(channel, data)
    } else {
        let playerUuid = String(player.uuid.toString())
        let queue = S2CDataQueue.get(playerUuid)
        if (!queue) {
            queue = []
            S2CDataQueue.set(playerUuid, queue)
        }
        queue.push({ 'channel': channel, 'data': data })
    }
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 */
function SyncQueuedData(player) {
    let playerUuid = String(player.uuid.toString())
    let queue = S2CDataQueue.get(playerUuid)
    if (queue) {
        queue.forEach(data => {
            player.sendData(data.channel, data.data)
        })
        S2CDataQueue.delete(playerUuid)
    }
}