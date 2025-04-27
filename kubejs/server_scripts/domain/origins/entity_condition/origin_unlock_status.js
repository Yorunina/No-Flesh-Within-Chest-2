// priority: 500
const DefaultConfigsPath = 'defaultconfigs'
const OriginUnlockStatusData = 'defaultconfigs/origin_unlock_status.json'

const OriginUnlockStatusUuidMap = {}
if (!FilesJS.exists(DefaultConfigsPath)) {
    FilesJS.createDirectory(DefaultConfigsPath)
}
if (FilesJS.exists(OriginUnlockStatusData)) {
    let playerStatusJson = JsonIO.readJson(OriginUnlockStatusData).getAsJsonObject()
    playerStatusJson.entrySet().forEach(playerStatus => {
        let playerUuid = playerStatus.getKey()
        let playerOriginList = playerStatus.getValue().getAsJsonArray()
        if (!OriginUnlockStatusUuidMap[playerUuid]) {
            OriginUnlockStatusUuidMap[playerUuid] = {}
        }
        playerOriginList.forEach(originId => {
            OriginUnlockStatusUuidMap[playerUuid][originId.getAsString()] = true
        })
    })
} else {
    FilesJS.appendFile(OriginUnlockStatusData, '{}')
}

global.OriginEntityConditionServerEvent = (event) => {
    /**@type {Internal.ServerPlayer} */
    let player = event.player
    let id = event.getId().toString()
    let uuidString = player.getUuid().toString()
    if (!OriginUnlockStatusUuidMap[uuidString]) {
        event.cancel()
    }
    if (!OriginUnlockStatusUuidMap[uuidString][id]) {
        event.cancel()
    }
}

PlayerEvents.loggedIn(event => {
    const player = event.player
    syncPlayerOriginUnlockStatus(player)
})


/**
 * 
 * @param {Internal.ServerPlayer} player 
 */
function syncPlayerOriginUnlockStatus(player) {
    let uuidString = player.getUuid().toString()
    let data = new $CompoundTag()
    if (OriginUnlockStatusUuidMap[uuidString]) {
        for (let id in OriginUnlockStatusUuidMap[uuidString]) {
            data.putBoolean(id, OriginUnlockStatusUuidMap[uuidString][id])
        }
    }
    player.sendData('sync_origin_unlock_status', data)
}

/**
 * 解锁某个起源
 * @param {Internal.ServerPlayer} player 
 * @param {string} id 
 */
function UnlockOrigin(player, id) {
    if (!FilesJS.exists(OriginUnlockStatusData)) {
        return
    }
    let playerStatusJson = JsonIO.readJson(OriginUnlockStatusData).getAsJsonObject()
    let uuidString = player.getUuid().toString()
    let originList = [id]
    if (playerStatusJson.has(uuidString)) {
        playerStatusJson.get(uuidString).getAsJsonArray().forEach(originIdEle => {
            let originId = originIdEle.getAsString()
            if (originId == id) {
                return
            }
            originList.push(originId)
        })
    }
    playerStatusJson.add(uuidString, JsonIO.of(originList))
    JsonIO.write(OriginUnlockStatusData, playerStatusJson)
    if (!OriginUnlockStatusUuidMap[uuidString]) {
        OriginUnlockStatusUuidMap[uuidString] = {}
    }
    OriginUnlockStatusUuidMap[uuidString][id] = true
    syncPlayerOriginUnlockStatus(player)
}


/**
 * 锁定某个起源
 * @param {Internal.ServerPlayer} player 
 * @param {string} id 
 */
function LockOrigin(player, id) {
    if (!FilesJS.exists(OriginUnlockStatusData)) {
        return
    }
    let playerStatusJson = JsonIO.readJson(OriginUnlockStatusData).getAsJsonObject()
    let uuidString = player.getUuid().toString()
    let originList = []
    if (playerStatusJson.has(uuidString)) {
        playerStatusJson.get(uuidString).getAsJsonArray().forEach(originIdEle => {
            let originId = originIdEle.getAsString()
            if (originId == id) {
                return
            }
            originList.push(originId)
        })
    } 
    playerStatusJson.add(uuidString, JsonIO.of(originList))
    JsonIO.write(OriginUnlockStatusData, playerStatusJson)
    if (!OriginUnlockStatusUuidMap[uuidString]) {
        OriginUnlockStatusUuidMap[uuidString] = {}
    }
    OriginUnlockStatusUuidMap[uuidString][id] = false
    syncPlayerOriginUnlockStatus(player)
}


function IsOriginUnlock(player, id) {
    let uuidString = player.getUuid().toString()
    if (!OriginUnlockStatusUuidMap[uuidString]) {
        return false
    }
    return OriginUnlockStatusUuidMap[uuidString][id] || false
}