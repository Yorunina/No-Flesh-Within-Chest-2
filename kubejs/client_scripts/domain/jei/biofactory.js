// priority: 500
JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:crushing_wheel', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.crushing_wheel.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:crushing_wheel')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 29).addItemStack(Item.of('kubejs:crushing_wheel'))
            builder.addSlot('input', 45, 9).addItemStack(data.oriItem).setSlotName('input_item')
            if (data.outputItem1 != null) {
                builder.addSlot('output', 71, 48).addItemStack(data.outputItem).setSlotName('output_item')
                builder.addSlot('output', 89, 48).addItemStack(data.outputItem1).setSlotName('output_item1')
            } else {
                builder.addSlot('output', 80, 48).addItemStack(data.outputItem).setSlotName('output_item')
            }
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            let data = recipe.data
            $AllGuiTextures.JEI_DOWN_ARROW.render(guiGraphics, 74, 12)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 44, 8)
            if (data.outputItem1 != null) {
                $AllGuiTextures.JEI_SLOT.render(guiGraphics, 70, 47)
                $AllGuiTextures.JEI_SLOT.render(guiGraphics, 88, 47)
            } else {
                $AllGuiTextures.JEI_SLOT.render(guiGraphics, 79, 47)
            }
        })
    })
    event.custom('kubejs:deployer', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.deployer.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:deployer')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 20).addItemStack(Item.of('kubejs:deployer'))
            builder.addSlot('output', 128, 45).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('input', 35, 45).addItemStack(data.oriItem).setSlotName('input_item')
            builder.addSlot('input', 62, 20).addItemStack(data.oriItem1).setSlotName('input_item1')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 48)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 61, 19)
        })
    })
    event.custom('kubejs:encased_fan', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.encased_fan.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:encased_fan')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 20).addItemStack(Item.of('kubejs:encased_fan'))
            builder.addSlot('output', 128, 45).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('input', 35, 45).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 48)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 44)
        })
    })
    event.custom('kubejs:item_drain', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.item_drain.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:item_drain')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 40).addItemStack(Item.of('kubejs:item_drain'))
            builder.addSlot('output', 128, 39).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('output', 128, 19)
                .addFluidStack(data.outputFluid.getFluid(), data.outputFluid.getAmount(), data.outputFluid.getNbt())
                .setFluidRenderer(data.outputFluid.getAmount(), false, 16, 16)
                .setSlotName('output_fluid')
            builder.addSlot('input', 35, 19).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_DOWN_ARROW.render(guiGraphics, 74, 22)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 38)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 18)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 18)
        })
    })
    event.custom('kubejs:mechanical_mixer', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.mechanical_mixer.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:mechanical_mixer')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 4).addItemStack(Item.of('kubejs:mechanical_mixer'))
            builder.addSlot('output', 128, 29).addItemStack(data.outputItem).setSlotName('output_item')
            if (data.outputItem1 != null) {
                builder.addSlot('output', 146, 29).addItemStack(data.outputItem1).setSlotName('output_item1')
            }
            builder.addSlot('input', 35, 29).addItemStack(data.oriItem).setSlotName('input_item')
            if (data.oriItem1 != null) {
                builder.addSlot('input', 17, 29).addItemStack(data.oriItem1).setSlotName('input_item1')
                builder.addSlot('input', 26, 50).addItemStack(Item.of('kubejs:basin'))
            } else {
                builder.addSlot('input', 35, 50).addItemStack(Item.of('kubejs:basin'))
            }
            if (data.requireItem != null) {
                builder.addSlot('input', 79, 42).addItemStack(data.requireItem).setSlotName('input_item2')
            }
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            let data = recipe.data
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 32)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 28)
            if (data.oriItem1 != null) {
                $AllGuiTextures.JEI_SLOT.render(guiGraphics, 16, 28)
            }
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 28)
            if (data.outputItem1 != null) {
                $AllGuiTextures.JEI_SLOT.render(guiGraphics, 145, 28)
            }
            if (data.requireItem != null) {
                $AllGuiTextures.JEI_CHANCE_SLOT.render(guiGraphics, 78, 41)
            }
        })
    })
    event.custom('kubejs:mechanical_press', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.mechanical_press.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:mechanical_press')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 20).addItemStack(Item.of('kubejs:mechanical_press'))
            builder.addSlot('output', 128, 45).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('input', 35, 45).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 48)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 44)
        })
    })
    event.custom('kubejs:mechanical_saw', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.mechanical_saw.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:mechanical_saw')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 79, 42).addItemStack(Item.of('kubejs:mechanical_saw'))
            builder.addSlot('output', 128, 29).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('input', 35, 29).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 32)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 28)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 28)
        })
    })
    event.custom('kubejs:spout', category => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.spout.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:spout')))
        category.isRecipeHandled(recipe => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addSlot('input', 80, 20).addItemStack(Item.of('kubejs:spout'))
            builder.addSlot('output', 128, 45).addItemStack(data.outputItem).setSlotName('output_item')
            builder.addSlot('input', 35, 25)
                .addFluidStack(data.inputFluid.getFluid(), data.inputFluid.getAmount(), data.inputFluid.getNbt())
                .setFluidRenderer(data.inputFluid.getAmount(), false, 16, 16)
            builder.addSlot('input', 35, 45).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 68, 48)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 127, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 44)
            $AllGuiTextures.JEI_SLOT.render(guiGraphics, 34, 24)
        })
    })
})

JEIAddedEvents.registerRecipes(event => {
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @param {Internal.ItemStack | null} outputItem1
     * @returns {void}
     */
    function registryOrganCrushingWheelRecipe(oriItem, outputItem, outputItem1) {
        event.custom('kubejs:crushing_wheel').add({
            outputItem: outputItem,
            outputItem1: outputItem1,
            oriItem: oriItem
        })
    }
    registryOrganCrushingWheelRecipe(Item.of('kubejs:dried_taste_worm'), Item.of('kubejs:taste_worm_powder', 3), null)
    registryOrganCrushingWheelRecipe(
        Item.of('minecraft:nether_wart_block'),
        Item.of('biomancy:nutrient_paste', 9),
        Item.of('biomancy:nutrient_paste', 9)
    )
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack | null} oriItem1
     * @param {Internal.ItemStack} outputItem
     * @returns {void}
     */
    function registryOrganDeployerRecipe(oriItem, oriItem1, outputItem) {
        event.custom('kubejs:deployer').add({
            outputItem: outputItem,
            oriItem: oriItem,
            oriItem1: oriItem1
        })
    }
    registryOrganDeployerRecipe(Item.of('minecraft:stripped_oak_log'), Item.of('create:andesite_alloy'), Item.of('create:andesite_casing'))
    registryOrganDeployerRecipe(Item.of('minecraft:stripped_oak_log'), Item.of('minecraft:copper_ingot'), Item.of('create:copper_casing'))
    registryOrganDeployerRecipe(Item.of('minecraft:stripped_oak_log'), Item.of('create:brass_ingot'), Item.of('create:brass_casing'))
    registryOrganDeployerRecipe(Item.of('create:rose_quartz'), Item.of('create:sand_paper'), Item.of('create:polished_rose_quartz'))
    registryOrganDeployerRecipe(Item.of('kubejs:third_fabritem'), Item.of('kubejs:other_fabritem'), Item.of('kubejs:fourth_fabritem'))
    registryOrganDeployerRecipe(Item.of('kubejs:search_everything'), Item.of('kubejs:final_fabritem'), Item.of('kubejs:factory_heart'))
    registryOrganDeployerRecipe(Item.of('tetra:geode'), Item.of('create_connected:control_chip'), Item.of('kubejs:ore_vein_generator'))
    registryOrganDeployerRecipe(Item.of('create:brass_hand'), Item.of('create:iron_sheet'), Item.of('kubejs:telescopic_arm'))
    registryOrganDeployerRecipe(Item.of('kubejs:telescopic_arm'), Item.of('minecraft:gunpowder'), Item.of('kubejs:telescopic_attack_arm'))
    registryOrganDeployerRecipe(
        Item.of('kubejs:telescopic_attack_arm'),
        Item.of('minecraft:blaze_powder'),
        Item.of('kubejs:pressurized_arm')
    )
    registryOrganDeployerRecipe(
        Item.of('minecraft:writable_book'),
        Item.of('minecraft:glowstone_dust'),
        Item.of('kubejs:world_token_creative')
    )
    registryOrganDeployerRecipe(Item.of('minecraft:writable_book'), Item.of('minecraft:redstone'), Item.of('kubejs:world_token_gamerule'))
    registryOrganDeployerRecipe(
        Item.of('minecraft:writable_book'),
        Item.of('minecraft:prismarine_crystals'),
        Item.of('kubejs:world_token_weather')
    )
    registryOrganDeployerRecipe(
        Item.of('minecraft:amethyst_shard'),
        Item.of('create:sand_paper'),
        Item.of('createutilities:polished_amethyst')
    )
    registryOrganDeployerRecipe(Item.of('kubejs:twinkle_rib'), Item.of('create:sand_paper'), Item.of('kubejs:twinkle_rib'))
    registryOrganDeployerRecipe(
        Item.of('minecraft:obsidian'),
        Item.of('createutilities:void_steel_ingot'),
        Item.of('createutilities:void_casing')
    )
    registryOrganDeployerRecipe(Item.of('kubejs:witch_fibroma'), Item.of('supplementaries:jar'), Item.of('kubejs:machine_witch_fibroma'))
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @returns {void}
     */
    function registryOrganEncasedFanRecipe(oriItem, outputItem) {
        event.custom('kubejs:encased_fan').add({
            outputItem: outputItem,
            oriItem: oriItem
        })
    }
    registryOrganEncasedFanRecipe(Item.of('kubejs:throat_fabritem', '{greedyThroatUUID:[]}'), Item.of('kubejs:throat_fabritem'))
    registryOrganEncasedFanRecipe(Item.of('minecraft:ink_sac'), Item.of('minecraft:glow_ink_sac'))
    registryOrganEncasedFanRecipe(Item.of('minecraft:sweet_berries'), Item.of('minecraft:glow_berries'))
    registryOrganEncasedFanRecipe(Item.of('minecraft:red_mushroom'), Item.of('minecraft:crimson_fungus'))
    registryOrganEncasedFanRecipe(Item.of('minecraft:brown_mushroom'), Item.of('minecraft:warped_fungus'))
    registryOrganEncasedFanRecipe(Item.of('create:wheat_flour'), Item.of('create:dough'))
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @param {Internal.FluidStack} outputFluid
     * @returns {void}
     */
    function registryOrganItemDrainRecipe(oriItem, outputItem, outputFluid) {
        event.custom('kubejs:item_drain').add({
            outputItem: outputItem,
            oriItem: oriItem,
            outputFluid: outputFluid
        })
    }
    registryOrganItemDrainRecipe(Item.of('kubejs:second_fabritem'), Item.of('kubejs:third_fabritem'), Fluid.of('kubejs:other_fluid', 1000))
    registryOrganItemDrainRecipe(Item.of('kubejs:furnace_fabritem'), Item.of('kubejs:purgatory'), Fluid.of('minecraft:lava', 100))
    registryOrganItemDrainRecipe(Item.of('kubejs:burning_fabritem'), Item.of('kubejs:purgatory'), Fluid.of('minecraft:lava', 500))
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack | null} oriItem1
     * @param {Internal.ItemStack} outputItem
     * @param {Internal.ItemStack | null} outputItem1
     * @param {Internal.ItemStack | null} requireItem
     * @returns {void}
     */
    function registryOrganMechanicalmixerRecipe(oriItem, oriItem1, outputItem, outputItem1, requireItem) {
        event.custom('kubejs:mechanical_mixer').add({
            outputItem: outputItem,
            outputItem1: outputItem1,
            oriItem: oriItem,
            oriItem1: oriItem1,
            requireItem: requireItem
        })
    }
    registryOrganMechanicalmixerRecipe(
        Item.of('minecraft:andesite'),
        Item.of('create:zinc_nugget'),
        Item.of('create:andesite_alloy'),
        null,
        null
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('minecraft:andesite'),
        Item.of('minecraft:iron_nugget'),
        Item.of('create:andesite_alloy'),
        null,
        null
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('minecraft:copper_ingot'),
        Item.of('create:zinc_ingot'),
        Item.of('2x create:brass_ingot'),
        null,
        Item.of('kubejs:furnace_core')
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('create:brass_ingot'),
        Item.of('biomancy:living_flesh'),
        Item.of('kubejs:flesh_ingot'),
        null,
        Item.of('kubejs:burning_heart')
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('kubejs:first_fabritem'),
        null,
        Item.of('kubejs:second_fabritem'),
        Item.of('kubejs:other_fabritem'),
        null
    )
    registryOrganMechanicalmixerRecipe(Item.of('minecraft:oak_sapling'), null, Item.of('create:pulp'), null, null)
    registryOrganMechanicalmixerRecipe(
        Item.of('create:crushed_raw_zinc'),
        Item.of('minecraft:stone'),
        Item.of('create:asurine'),
        null,
        Item.of('kubejs:burning_heart')
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('minecraft:end_stone'),
        Item.of('minecraft:iron_ingot'),
        Item.of('createutilities:void_steel_ingot'),
        null,
        Item.of('kubejs:furnace_core')
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('kubejs:purgatory'),
        null,
        Item.of('kubejs:furnace_fabritem'),
        null,
        Item.of('kubejs:furnace_core')
    )
    registryOrganMechanicalmixerRecipe(
        Item.of('kubejs:purgatory'),
        null,
        Item.of('kubejs:burning_fabritem'),
        null,
        Item.of('kubejs:burning_heart')
    )
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @returns {void}
     */
    function registryOrganMechanicalPressRecipe(oriItem, outputItem) {
        event.custom('kubejs:mechanical_press').add({
            outputItem: outputItem,
            oriItem: oriItem
        })
    }
    registryOrganMechanicalPressRecipe(Item.of('biomancy:living_flesh'), Item.of('kubejs:flesh_sheet'))
    registryOrganMechanicalPressRecipe(Item.of('kubejs:final_fabritem'), Item.of('kubejs:first_fabritem'))
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @returns {void}
     */
    function registryOrganMechanicalSawRecipe(oriItem, outputItem) {
        event.custom('kubejs:mechanical_saw').add({
            outputItem: outputItem,
            oriItem: oriItem
        })
    }
    registryOrganMechanicalSawRecipe(Item.of('kubejs:eternal_oath'), Item.of('kubejs:growing_oath'))
    registryOrganMechanicalSawRecipe(Item.of('kubejs:growing_oath'), Item.of('kubejs:immortal_oath'))
    registryOrganMechanicalSawRecipe(Item.of('kubejs:immortal_oath'), Item.of('kubejs:eternal_oath'))
    /**
     * 注册器官加工配方的 JEI 展示条目。
     * @param {Internal.ItemStack} oriItem
     * @param {Internal.ItemStack} outputItem
     * @param {Internal.FluidStack} inputFluid
     * @returns {void}
     */
    function registryOrganSpoutRecipe(oriItem, outputItem, inputFluid) {
        event.custom('kubejs:spout').add({
            outputItem: outputItem,
            oriItem: oriItem,
            inputFluid: inputFluid
        })
    }
    registryOrganSpoutRecipe(Item.of('kubejs:fourth_fabritem'), Item.of('kubejs:fifth_fabritem'), Fluid.of('kubejs:other_fluid', 1000))
    registryOrganSpoutRecipe(Item.of('create:blaze_cake_base'), Item.of('create:blaze_cake'), Fluid.of('minecraft:lava', 250))
    registryOrganSpoutRecipe(Item.of('minecraft:glass_bottle'), Item.of('create:builders_tea'), Fluid.of('create:tea', 250))
    registryOrganSpoutRecipe(
        Item.of('create:cinder_flour'),
        Item.of('minecraft:glowstone_dust'),
        Fluid.of('create:potion', 5).withNBT({ Bottle: 'REGULAR', Potion: 'minecraft:night_vision' })
    )
    registryOrganSpoutRecipe(
        Item.of('create:cinder_flour'),
        Item.of('minecraft:redstone'),
        Fluid.of('create:potion', 5).withNBT({ Bottle: 'REGULAR', Potion: 'minecraft:strength' })
    )
    registryOrganSpoutRecipe(
        Item.of('create:cinder_flour'),
        Item.of('minecraft:gunpowder'),
        Fluid.of('create:potion', 5).withNBT({ Bottle: 'REGULAR', Potion: 'minecraft:harming' })
    )
    registryOrganSpoutRecipe(Item.of('minecraft:dirt'), Item.of('minecraft:grass_block'), Fluid.of('minecraft:water', 500))
    registryOrganSpoutRecipe(
        Item.of('tetra:thermal_cell', '{Damage:128}'),
        Item.of('tetra:thermal_cell', '{Damage:0}'),
        Fluid.of('minecraft:lava', 1000)
    )
    registryOrganSpoutRecipe(Item.of('minecraft:quartz'), Item.of('create:rose_quartz'), Fluid.of('kubejs:molten_rose_quartz', 100))
    registryOrganSpoutRecipe(
        Item.of('kubejs:player_27_injection'),
        Item.of('kubejs:transdimensional_mechanized_injection'),
        Fluid.of('create_biotech:teleportation', 1000)
    )
    registryOrganSpoutRecipe(Item.of('biomancy:vial'), Item.of('biomancy:ageing_serum'), Fluid.of('kubejs:ageing_fluid', 250))
    registryOrganSpoutRecipe(Item.of('biomancy:vial'), Item.of('biomancy:rejuvenation_serum'), Fluid.of('kubejs:rejuvenation_fluid', 250))
    registryOrganSpoutRecipe(
        Item.of('biomancy:vial'),
        Item.of('biomancy:breeding_stimulant'),
        Fluid.of('kubejs:neuroexcitatory_hormone_fluid', 250)
    )
    registryOrganSpoutRecipe(Item.of('biomancy:vial'), Item.of('biomancy:cleansing_serum'), Fluid.of('minecraft:milk', 250))
    registryOrganSpoutRecipe(Item.of('minecraft:purple_dye'), Item.of('minecraft:red_dye'), Fluid.of('minecraft:lava', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:yellow_dye'), Item.of('minecraft:red_dye'), Fluid.of('minecraft:lava', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:orange_dye'), Item.of('minecraft:red_dye'), Fluid.of('minecraft:lava', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:yellow_dye'), Item.of('minecraft:green_dye'), Fluid.of('biomancy:acid', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:cyan_dye'), Item.of('minecraft:green_dye'), Fluid.of('biomancy:acid', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:cyan_dye'), Item.of('minecraft:blue_dye'), Fluid.of('minecraft:water', 1))
    registryOrganSpoutRecipe(Item.of('minecraft:orange_dye'), Item.of('minecraft:yellow_dye'), Fluid.of('create:honey', 1))
    registryOrganSpoutRecipe(Item.of('kubejs:furnace_core'), Item.of('kubejs:burning_heart'), Fluid.of('minecraft:lava', 1000))
})
