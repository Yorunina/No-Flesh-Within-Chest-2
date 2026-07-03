// priority: 500
JEIAddedEvents.registerCategories((event) => {
    event.custom('kubejs:mammary_gland', (category) => {
        const guiHelper = category.jeiHelpers.guiHelper
        category.title(Text.translatable('jei.category.kubejs.mammary_gland.name'))
        category.setWidth(178)
        category.setHeight(72)
        category.background(guiHelper.createBlankDrawable(0, 0))
        category.icon(guiHelper.createDrawableItemStack(Item.of('kubejs:mammary_gland')))
        category.isRecipeHandled((recipe) => true)
        category.handleLookup((builder, recipe, focuses) => {
            let data = recipe.data
            builder.addInvisibleIngredients('input').addItemStack(Item.of('kubejs:mammary_gland'))
            builder.addSlot('output', 128, 29).addItemStack(data.outputItem).setSlotName('output_item').setBackground(guiHelper.getSlotDrawable(), -1, -1)
            builder.addSlot('input', 79, 42).addItemStack(data.oriItem).setSlotName('input_item')
        })
        category.setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
            let data = recipe.data
            $AllGuiTextures.JEI_ARROW.render(guiGraphics, 67, 33)
            guiGraphics.blit(new ResourceLocation('kubejs:textures/particle/heart.png'), 92, 26, 0, 0, 0, 8, 8, 8, 8)
            guiGraphics.drawWordWrap(Client.font, Text.of(`${(data.damage / 2).toFixed(1)} x`), 75, 26, 30, 0)
            RenderHelper.renderEntity(guiGraphics, 35, 42, 20, 35 - mouseX, 42 - mouseY, Client.instance.level.createEntity(data.entityType))
        })
    })
})

JEIAddedEvents.registerRecipes(event => {
    function registryMammaryGlandRecipe(entityType, oriItem, outputItem, damage) {
        event.custom('kubejs:mammary_gland').add({
            entityType: entityType,
            outputItem: outputItem,
            oriItem: oriItem,
            damage: damage
        })
    }
    registryMammaryGlandRecipe('minecraft:bee', Item.of('minecraft:glass_bottle'), Item.of('minecraft:honey_bottle'), 4)
    registryMammaryGlandRecipe('minecraft:panda', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
    registryMammaryGlandRecipe('minecraft:frog', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:leaping"}'), 4)
    registryMammaryGlandRecipe('minecraft:bat', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:night_vision"}'), 4)
    registryMammaryGlandRecipe('minecraft:glow_squid', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:night_vision"}'), 4)
    registryMammaryGlandRecipe('minecraft:ghast', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:regeneration"}'), 6)
    registryMammaryGlandRecipe('minecraft:axolotl', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:regeneration"}'), 6)
    registryMammaryGlandRecipe('minecraft:shulker', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:slow_falling"}'), 4)
    registryMammaryGlandRecipe('minecraft:polar_bear', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
    registryMammaryGlandRecipe('minecraft:ravager', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
    registryMammaryGlandRecipe('minecraft:zoglin', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:strength"}'), 4)
    registryMammaryGlandRecipe('minecraft:strider', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:fire_resistance"}'), 4)
    registryMammaryGlandRecipe('minecraft:dolphin', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:fox', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:horse', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:donkey', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:mule', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:llama', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:trader_llama', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:ocelot', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:swiftness"}'), 4)
    registryMammaryGlandRecipe('minecraft:turtle', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:turtle_master"}'), 4)
    registryMammaryGlandRecipe('minecraft:squid', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:water_breathing"}'), 4)
    registryMammaryGlandRecipe('minecraft:pufferfish', Item.of('minecraft:glass_bottle'), Item.of('minecraft:potion', '{Potion:"minecraft:water_breathing"}'), 4)
    registryMammaryGlandRecipe('minecraft:zombified_piglin', Item.of('minecraft:bucket'), Item.of('kubejs:molten_gold_fluid_bucket'), 15)
    registryMammaryGlandRecipe('minecraft:drowned', Item.of('minecraft:bucket'), Item.of('kubejs:molten_copper_fluid_bucket'), 15)
    registryMammaryGlandRecipe('minecraft:iron_golem', Item.of('minecraft:bucket'), Item.of('kubejs:molten_iron_fluid_bucket'), 25)
    registryMammaryGlandRecipe('minecraft:magma_cube', Item.of('minecraft:slime_ball'), Item.of('minecraft:magma_cream'), 1)
    registryMammaryGlandRecipe('minecraft:villager', Item.of('minecraft:bucket'), Item.of('kubejs:molten_emerald_fluid_bucket'), 15)
    registryMammaryGlandRecipe('minecraft:ender_dragon', Item.of('minecraft:glass_bottle'), Item.of('minecraft:dragon_breath'), 10)
    registryMammaryGlandRecipe('dracolotl:dracolotl', Item.of('minecraft:glass_bottle'), Item.of('minecraft:dragon_breath'), 2)
    registryMammaryGlandRecipe('biomancy:flesh_blob', Item.of('minecraft:bucket'), Item.of('kubejs:blood_fluid_bucket'), 4)
    registryMammaryGlandRecipe('biomancy:primordial_flesh_blob', Item.of('minecraft:bucket'), Item.of('kubejs:blood_fluid_bucket'), 4)
    registryMammaryGlandRecipe('biomancy:hungry_flesh_blob', Item.of('minecraft:bucket'), Item.of('kubejs:blood_fluid_bucket'), 4)
    registryMammaryGlandRecipe('biomancy:legacy_flesh_blob', Item.of('minecraft:bucket'), Item.of('kubejs:blood_fluid_bucket'), 4)
    registryMammaryGlandRecipe('biomancy:primordial_hungry_flesh_blob', Item.of('minecraft:bucket'), Item.of('kubejs:blood_fluid_bucket'), 4)
})