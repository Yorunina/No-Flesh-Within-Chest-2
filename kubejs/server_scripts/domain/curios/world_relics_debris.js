// priority: 1000
// EntityEvents.death('minecraft:player', event => {
//     /**@type {Internal.ServerPlayer} */
//     const entity = event.entity
//     if (!entity.isPlayer()) return
//     const curiosInventoryCap = GetCuriosInventoryCap(entity)
//     if (!curiosInventoryCap) return
//     const equippedCurios = curiosInventoryCap.getEquippedCurios()
//     equippedCurios.allItems.forEach(item => {
//         if (item.is('kubejs:world_relics_debris_1')) {
//             item.drop(entity)
//         }
//     })
// })