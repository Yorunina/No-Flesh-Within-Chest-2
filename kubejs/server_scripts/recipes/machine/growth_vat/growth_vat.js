// priority: 500
/**
 * @param {Player} owner 
 */
function IncrGrowthVatRuns(owner) {
    if (!owner) return
    owner.stats.add(global.STAT_GROWTH_VAT_RUNS, 1)
}

const GrowthVatOutputSlotsList = ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5', 'slot_6']
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 1800)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) return
                UnformedTumorGrowth(machine, item, pSlotId)
            })
            IncrGrowthVatRuns(machine.owner)
            return ctx.success()
        })
        .requireItem('kubejs:simple_culture_medium', 'input_slot')
        .requireFluidTag('kubejs:nutrients_fluid', 250, 'nutrient_solution')

    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 1800)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) {
                    SpawnUnformedTumor(machine, fluid, pSlotId)
                } else {
                    UnformedTumorGrowth(machine, item, pSlotId)
                }
            })
            IncrGrowthVatRuns(machine.owner)
            return ctx.success()
        })
        .requireItem('kubejs:culture_medium', 'input_slot')
        .requireFluidTag('kubejs:nutrients_fluid', 250, 'nutrient_solution')


    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 1800)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (item && !item.isEmpty()) {
                    UnformedTumorMutationGrowth(machine, fluid, item, pSlotId)
                }
            })
            IncrGrowthVatRuns(machine.owner)
            return ctx.success()
        })
        .requireItem('kubejs:mutation_culture_medium', 'input_slot')
        .requireFluidTag('kubejs:nutrients_fluid', 250, 'nutrient_solution')

    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 1800)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            let outputItems = []
            let emptySlots = []
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) {
                    emptySlots.push(pSlotId)
                } else {
                    outputItems = outputItems.concat(ProliferateTumor(machine, fluid, item, pSlotId))
                }
            })
            if (outputItems.length > emptySlots.length) {
                outputItems = outputItems.slice(0, emptySlots.length)
            }
            emptySlots.forEach((pSlotId, index) => {
                machine.setItemStored(pSlotId, outputItems[index])
            })
            IncrGrowthVatRuns(machine.owner)
            return ctx.success()
        })
        .requireItem('kubejs:proliferation_culture_medium', 'input_slot')
        .requireFluidTag('kubejs:nutrients_fluid', 250, 'nutrient_solution')


    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 1800)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            let unformedTumorList = []
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) return
                if (!item.is('kubejs:unformed_tumor')) return
                unformedTumorList.push({ item: item, slotId: pSlotId })
            })
            MixUnformedTumorAttri(machine, fluid, unformedTumorList)
            IncrGrowthVatRuns(machine.owner)
            return ctx.success()
        })
        .requireItem('kubejs:mixed_culture_medium', 'input_slot')
        .requireFluidTag('kubejs:nutrients_fluid', 250, 'nutrient_solution')
})