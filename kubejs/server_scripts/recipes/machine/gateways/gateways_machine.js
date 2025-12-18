// priority: 500
// ServerEvents.recipes(event => {
//     event.recipes.custommachinery.custom_machine('kubejs:gateways', 60)
//         .requireFunctionOnStart(ctx => {
//             const machine = ctx.getMachine()
//             const data = machine.getData()
//             data.putInt('resource_bar', 512)
//             return ctx.success()
//         })
//         .requireFunctionEachTick(ctx => {
//             const machine = ctx.getMachine()
//             const data = machine.getData()
//             let resourceBar = data.getInt('resource_bar')
//             let ccItem = machine.getItemStored('input_2')
//             if (ccItem.is('create:chromatic_compound')) {
//                 let ccCount = ccItem ? ccItem.getCount() : 0
//                 data.putInt('resource_bar', Math.min(resourceBar + ccCount * 512, 1000000))
//                 machine.setItemStored('input_2', Item.empty)
//             }
//             return ctx.success()
//         })
//         .requireSU(128)
//         .requireFunctionOnEnd(ctx => {
//             const machine = ctx.getMachine()
//             const data = machine.getData()
//             let resourceBar = data.getInt('resource_bar')
//             data.putInt('resource_bar', 0)
//             if (Math.random() < Math.pow(resourceBar / 1000000, 2)) {
//                 return ctx.success()
//             }
//             return ctx.error('Error')
//         })
//         .requireItem(Item.of('kubejs:reverse_causality_chip'), 'input_3')
//         .requireItem(Item.of('create:chromatic_compound'), 'input_2')
//         .requireItem(Item.of('kubejs:circuit_board'), 'input_1')
//         .produceItem(Item.of('kubejs:world_renderer', 1), 'output_1')
//         .resetOnError()
// })