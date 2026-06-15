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
    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 900)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.getAmount() < 250) return ctx.error()
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) return
                UnformedTumorGrowth(machine, item, pSlotId)
            })
            IncrGrowthVatRuns(machine.owner)
            machine.removeFluidFromTank('nutrient_solution', 250, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.hasTag('kubejs:nutrients_fluid') && fluid.amount >= 250) return ctx.success()
            return ctx.error('')
        })
        .requireItem('kubejs:simple_culture_medium', 'input_slot')

    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 900)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.getAmount() < 250) return ctx.error()
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) {
                    SpawnUnformedTumor(machine, fluid, pSlotId)
                } else {
                    UnformedTumorGrowth(machine, item, pSlotId)
                }
            })
            IncrGrowthVatRuns(machine.owner)
            machine.removeFluidFromTank('nutrient_solution', 250, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.hasTag('kubejs:nutrients_fluid') && fluid.amount >= 250) return ctx.success()
            return ctx.error('')
        })
        .requireItem('kubejs:culture_medium', 'input_slot')


    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 900)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.getAmount() < 250) return ctx.error()
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (item && !item.isEmpty()) {
                    UnformedTumorMutationGrowth(machine, fluid, item, pSlotId)
                }
            })
            IncrGrowthVatRuns(machine.owner)
            machine.removeFluidFromTank('nutrient_solution', 250, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.hasTag('kubejs:nutrients_fluid') && fluid.amount >= 250) return ctx.success()
            return ctx.error('')
        })
        .requireItem('kubejs:mutation_culture_medium', 'input_slot')

    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 900)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.getAmount() < 250) return ctx.error()
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
            machine.removeFluidFromTank('nutrient_solution', 250, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.hasTag('kubejs:nutrients_fluid') && fluid.amount >= 250) return ctx.success()
            return ctx.error('')
        })
        .requireItem('kubejs:proliferation_culture_medium', 'input_slot')


    event.recipes.custommachinery.custom_machine('kubejs:growth_vat', 900)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.getAmount() < 250) return ctx.error()
            let unformedTumorList = []
            GrowthVatOutputSlotsList.forEach(pSlotId => {
                let item = machine.getItemStored(pSlotId)
                if (!item || item.isEmpty()) return
                if (!item.is('kubejs:unformed_tumor')) return
                unformedTumorList.push({ item: item, slotId: pSlotId })
            })
            MixUnformedTumorAttri(machine, fluid, unformedTumorList)
            IncrGrowthVatRuns(machine.owner)
            machine.removeFluidFromTank('nutrient_solution', 250, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            let fluid = machine.getFluidStored('nutrient_solution')
            if (fluid.hasTag('kubejs:nutrients_fluid') && fluid.amount >= 250) return ctx.success()
            return ctx.error('')
        })
        .requireItem('kubejs:mixed_culture_medium', 'input_slot')
})