// priority: 3000
// /**
//  * 
//  * @param {Internal.MinecraftServer} server 
//  * @param {number} size 默认20
//  * @param {number} r 默认1
//  * @param {number} g 
//  * @param {number} b 
//  */
// function SetMoonData(server, size, r, g, b) {
//     let moonNbt = new $CompoundTag()
//     moonNbt.putInt('moonSize', size)
//     let colorData = new $ListTag()
//     colorData.add(NBT.f(r))
//     colorData.add(NBT.f(g))
//     colorData.add(NBT.f(b))
//     moonNbt.put('moonShaderColor', colorData)
//     server.persistentData.put('moonData', moonNbt)

//     server.getPlayers().forEach(/**@param {Internal.ServerPlayer} player */ player => {
//         player.sendData('modify_moon', moonNbt)
//     })
// }

// /**
//  * 
//  * @param {Internal.ServerPlayer} player 
//  */
// function SyncClientMoonEvent(player) {
//     if (player.server.persistentData.contains('moonData')) {
//         let moonNbt = player.server.persistentData.getCompound('moonData')
//         player.sendData('modify_moon', moonNbt)
//     } else {
//         player.sendData('modify_moon')
//     }
// }