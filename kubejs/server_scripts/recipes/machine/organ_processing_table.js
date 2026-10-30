// priority: 500
/**
 * 增加器官加工台完成次数统计。
 * @param {Internal.ServerPlayer | null} owner
 * @returns {void}
 */
function incrORGANPROCESSINGTABLERuns(owner) {
    if (!owner) return
    owner.stats.add(global.STAT_ORGAN_PROCESSING_TABLE_RUNS, 1)
}
const organProcessingTableStructure = [
    ['BAB', 'AAA', 'B B'],
    ['DCD', 'C C', 'DmD'],
    ['BAB', 'AAA', 'BAB']
]
const organProcessingTableStructureMapping = {
    A: 'biomancy:smooth_primal_flesh',
    B: 'kubejs:flesh_casing',
    C: 'biomancy:primal_permeable_membrane',
    D: 'biomancy:ornate_flesh'
}
ServerEvents.recipes(event => {
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 1)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const nutritionitem = machine.getItemStored('input_3')
            if (nutritionitem.getId() != 'biomancy:nutrient_paste') return ctx.error('')
            let nutritioncount = nutritionitem.getCount()
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar + nutritioncount * 3 > 1000) return ctx.error('')
            return ctx.success()
        })
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const nutritionitem = machine.getItemStored('input_3')
            let nutritioncount = nutritionitem.getCount()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar + nutritioncount * 3)
            nutritionitem.shrink(nutritioncount)
            return ctx.success()
        })
        .resetOnError()
        .hide()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 20) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 20)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireItem(Item.of('create:water_wheel'), 'input_1')
        .produceItem(Item.of('kubejs:water_wheel', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            if (!item.nbt?.CapturedEntity?.ChestCavity?.Inventory) return ctx.error('')
            const hasSaw = item.nbt?.CapturedEntity?.ChestCavity?.Inventory?.some(slot => slot.id === 'create:mechanical_saw')
            if (!hasSaw) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 100) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 100)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireItem(
            Item.of(
                'create_biotech:large_cardboard_box',
                '{CapturedEntity:{id:"crittersandcompanions:otter"},CapturedEntityDescId:"entity.crittersandcompanions.otter"}'
            ).weakNBT(),
            'input_1'
        )
        .requireItem(Item.of('kubejs:flesh_mechanism'), 'input_2')
        .produceItem(Item.of('kubejs:mechanical_saw', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            if (!item.nbt?.CapturedEntity?.ChestCavity?.Inventory) return ctx.error('')
            const hasSaw = item.nbt?.CapturedEntity?.ChestCavity?.Inventory?.some(slot => slot.id === 'create:encased_fan')
            if (!hasSaw) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 100) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 100)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireItem(
            Item.of(
                'create_biotech:large_cardboard_box',
                '{CapturedEntity:{id:"cataclysm:netherite_ministrosity"},CapturedEntityDescId:"entity.cataclysm.netherite_ministrosity"}'
            ).weakNBT(),
            'input_1'
        )
        .requireItem(Item.of('kubejs:flesh_mechanism'), 'input_2')
        .produceItem(Item.of('kubejs:encased_fan', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            if (!item.nbt?.CapturedEntity?.ChestCavity?.Inventory) return ctx.error('')
            const hasSaw = item.nbt?.CapturedEntity?.ChestCavity?.Inventory?.some(slot => slot.id === 'create:mechanical_mixer')
            if (!hasSaw) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 100) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 100)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireItem(
            Item.of(
                'create_biotech:large_cardboard_box',
                '{CapturedEntity:{id:"minecraft:warden"},CapturedEntityDescId:"entity.minecraft.warden"}'
            ).weakNBT(),
            'input_1'
        )
        .requireItem(Item.of('kubejs:flesh_mechanism'), 'input_2')
        .produceItem(Item.of('kubejs:mechanical_mixer', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            if (!item.nbt?.CapturedEntity?.ChestCavity?.Inventory) return ctx.error('')
            const hasSaw = item.nbt?.CapturedEntity?.ChestCavity?.Inventory?.some(slot => slot.id === 'create:deployer')
            if (!hasSaw) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 200) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 200)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(
            Item.of(
                'create_biotech:large_cardboard_box',
                '{CapturedEntity:{id:"cataclysm:the_prowler"},CapturedEntityDescId:"entity.cataclysm.the_prowler"}'
            ).weakNBT(),
            'input_1'
        )
        .requireItem(Item.of('kubejs:flesh_mechanism'), 'input_2')
        .produceItem(Item.of('kubejs:deployer', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            let nbt = item.getNbt()
            if (nbt === null) return ctx.error('')
            if (!nbt.contains('chestcavity:organ_compatibility')) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 30) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_1')
            let nbt = item.getNbt()
            nbt.remove('chestcavity:organ_compatibility')
            machine.setItemStored('output_1', item.copyAndClear())
            item.shrink(1)
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 30)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            if (!AStages.playerHasStage(machine.owner, 'ftb_advance_organ_processing_table_2')) {
                AStages.addStageToPlayer(machine.owner, 'ftb_advance_organ_processing_table_2')
            }
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .resetOnError()
        .hide()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 200) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 200)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(
            Item.of(
                'create_biotech:large_cardboard_box',
                '{CapturedEntity:{id:"minecraft:wither"},CapturedEntityDescId:"entity.minecraft.wither"}'
            ).weakNBT(),
            'input_1'
        )
        .requireItem(Item.of('kubejs:flesh_mechanism'), 'input_2')
        .produceItem(Item.of('kubejs:mechanical_drill', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('create:belt_connector'), 'input_1')
        .produceItem(Item.of('kubejs:belt_connecter', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('create:smart_chute'), 'input_1')
        .produceItem(Item.of('kubejs:smart_chute', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('create:brass_funnel'), 'input_1')
        .produceItem(Item.of('kubejs:brass_funnel', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:animal_stomach'), 'input_1')
        .produceItem(Item.of('kubejs:magnetic_stomach', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 100)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item2 = machine.getItemStored('input_2')
            if (item2.getId() != 'kubejs:factory_ingot') return ctx.error('')
            const item1 = machine.getItemStored('input_1')
            if (item1.isEmpty()) return ctx.error('')
            if (item1.getMod() != 'create') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 10) return ctx.error('')
            return ctx.success()
        })
        .requireFunctionOnStart(ctx => {
            const machine = ctx.getMachine()
            const item = machine.getItemStored('input_1')
            item.shrink(1)
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 10)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            let chance = Math.floor(Math.random() * 101)
            if (chance == 100) {
                return ctx.success()
            }
            return ctx.error('')
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .produceItem(Item.of('kubejs:search_everything'), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 1200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            const entity = machine.owner
            const chestCavity = entity.chestCavityInstance
            if (chestCavity.getInventoryType() == 'kubejs:cc_inventory_types/factory') return ctx.error('')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 980) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 980)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            const entity = machine.owner
            const chestCavity = entity.chestCavityInstance
            chestCavity.setInventoryType('kubejs:cc_inventory_types/factory')
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('create:cogwheel', 64), 'input_1')
        .resetOnError()
        .hide()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 1200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:wrench') return ctx.error('')
            if (GetImprovementLevel(item, 'wrench_sensor') != 4) return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 800) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:wrench') return ctx.error('')
            if (GetImprovementLevel(item, 'wrench_sensor') != 4) return ctx.error('')
            item.shrink(1)
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 800)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('create:experience_nugget', 64), 'input_1')
        .produceItem(Item.of('kubejs:enchanting_stresssourse', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:animal_intestine'), 'input_1')
        .produceItem(Item.of('kubejs:teleport_intestine', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:animal_spleen'), 'input_1')
        .produceItem(Item.of('kubejs:recovery_spleen', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            const item = machine.getItemStored('input_2')
            if (item.getId() != 'kubejs:factory_heart') return ctx.error('')
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:animal_muscle'), 'input_1')
        .produceItem(Item.of('kubejs:wrench_muscle', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:belt_connecter'), 'input_1')
        .requireItem(Item.of('kubejs:worm_larva'), 'input_2')
        .produceItem(Item.of('kubejs:gula_belt', 1), 'output_1')
        .resetOnError()
    event.recipes.custommachinery
        .custom_machine('kubejs:organ_processing_table', 200)
        .requireFunctionToStart(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            if (nutritionbar < 300) return ctx.error('')
            return ctx.success()
        })
        .requireSU(256)
        .requireFunctionOnEnd(ctx => {
            const machine = ctx.getMachine()
            const data = machine.getData()
            let nutritionbar = data.getInt('nutrition_bar')
            data.putInt('nutrition_bar', nutritionbar - 300)
            incrORGANPROCESSINGTABLERuns(machine.owner)
            return ctx.success()
        })
        .requireStructure(organProcessingTableStructure, organProcessingTableStructureMapping)
        .requireItem(Item.of('kubejs:belt_connecter'), 'input_1')
        .requireItem(Item.of('kubejs:flame_crystal'), 'input_2')
        .produceItem(Item.of('kubejs:mechanized_belt', 1), 'output_1')
        .resetOnError()
})
