// priority: 500
const GrowthVatOutputSlotsList = ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5', 'slot_6']
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 60)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) return
                UnformedTumorGrowth(machine, item, pSlotId)
            })
            return ctx.success()
        })
        .requireItem('kubejs:simple_culture_medium', 'input_slot')
        .requireFluidTagPerTick('kubejs:nutrients_fluid', 1, 'nutrient_solution')

    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 60)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) {
                    if (Math.random() < 0.5) return
                    SpawnUnformedTumor(machine, fluid, pSlotId)
                } else {
                    UnformedTumorGrowth(machine, item, pSlotId)
                }
            })
            return ctx.success()
        })
        .requireItem('kubejs:culture_medium', 'input_slot')
        .requireFluidTagPerTick('kubejs:nutrients_fluid', 1, 'nutrient_solution')
})