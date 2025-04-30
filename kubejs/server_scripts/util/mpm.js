// priority: 3000
/**
 * 
 * @param {Internal.ServerPlayer} player 
 * @param {noppes.mpm.ModelData} modelData 
 */
function UpdateMpm(player, modelData) {
    modelData.refreshParts()
    modelData.updateTransate()
    modelData.save()
    $MpmPackets.sendNearby(player, new $PacketPlayerDataSend(player.getUuid(), modelData.writeToNBT()))
}
