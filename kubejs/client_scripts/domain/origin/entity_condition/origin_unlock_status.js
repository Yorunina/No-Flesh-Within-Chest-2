// priority: 500
let OriginUnlockStatus = {}

NetworkEvents.dataReceived('sync_origin_unlock_status', (event) => {
    OriginUnlockStatus = {}
    /**@type {Internal.CompoundTag} */
    let data = event.getData()
    Object.keys(data).forEach(key => {
        OriginUnlockStatus[key] = data.getBoolean(key)
    })
})

OriginEvents.OriginEntCondition(event => {
    let id = String(event.getKey())
    if (!OriginUnlockStatus[id]) {
        event.setResult(false)
        return
    }
    event.setResult(true)
})