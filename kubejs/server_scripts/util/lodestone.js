// priority: 3000
/**
 * 屏幕摇晃
 * @param {Internal.ServerPlayer} player 
 * @param {number} duration 持续时间
 * @param {number[]} intensity 强度
 */
function LodestoneScreenShake(player, duration, intensity) {
    let nbt = new $CompoundTag()
    nbt.putInt('duration', duration)
    nbt.putFloat('intensityX', intensity[0])
    nbt.putFloat('intensityY', intensity[1])
    nbt.putFloat('intensityZ', intensity[2])
    player.sendData('screen_shake', nbt)
}
