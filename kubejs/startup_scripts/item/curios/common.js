// priority: 1000
// StartupEvents.registry('minecraft:item', event => {
//     event.create('kubejs:world_relics_debris_1', 'basic')
//         .texture('kubejs:item/curios/world_relics_debris_1')
//         .maxStackSize(1)
//         .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
//             .canEquip(() => true)
//             .onEquip((itemFrom, ctx, itemTo) => {
//                 const entity = ctx.entity()
//                 const level = entity.level
//                 if (level.isClientSide()) return
//             })
//             .onUnequip((itemFrom, ctx, itemTo) => {
//                 const entity = ctx.entity()
//                 const level = entity.level
//                 if (level.isClientSide()) return
//             })
//             .curioTick((item, ctx) => {
//                 const entity = ctx.entity()
//                 const level = entity.level
//                 if (level.isClientSide()) return

//             })
//         )
//         .tag('curios:head')
// })