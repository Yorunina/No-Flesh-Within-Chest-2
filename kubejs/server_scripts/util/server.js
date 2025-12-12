// priority: 3000
/**
 * 
 * @param {Internal.MinecraftServer} server 
 * @param {boolean} bool 
 */
function SetEternalWinterEnabled(server, bool) {
    $EternalWinterUtil.setEternalWinterEnabled(bool)
    server.persistentData.putBoolean('isEternalWinter', bool)
}