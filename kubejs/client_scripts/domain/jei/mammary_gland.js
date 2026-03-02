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
            $RenderHelper.renderEntity(guiGraphics, 35, 42, 20, 38 - mouseX, 85 - mouseY, Client.instance.level.createEntity(data.entityType))
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
})