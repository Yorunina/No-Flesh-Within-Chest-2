// priority: 1000
const EncasedFanDecorator = RenderJSItemDecoratorHandler.registerForAllItem('fanbundle', ctx => {})

EncasedFanDecorator.setRender(ctx => {
    const item = ctx.itemStack
    const guiGraphics = ctx.guiGraphics
    if (!item.isEmpty() && item.getId() == 'kubejs:encased_fan') {
        let contents = getBundleContents(item)
        if (contents.isEmpty()) return
        let curItem = contents[0]
        if (curItem.isEmpty()) return
        let itemId = curItem.getId()
        RenderJSRenderSystem.setShaderColorJS(1, 1, 1, 1)
        RenderJSRenderSystem.disableDepthTestJS()
        if (itemId == 'create_connected:fan_blasting_catalyst') {
            guiGraphics.blit(
                new ResourceLocation('kubejs:textures/decorator/lava_bucket.png'),
                ctx.xOffset + 8,
                ctx.yOffset + 8,
                8,
                8,
                0,
                0,
                16,
                16,
                16,
                16
            )
        } else if (itemId == 'create_connected:fan_smoking_catalyst') {
            guiGraphics.blit(
                new ResourceLocation('kubejs:textures/decorator/campfire.png'),
                ctx.xOffset + 8,
                ctx.yOffset + 8,
                8,
                8,
                0,
                0,
                16,
                16,
                16,
                16
            )
        } else if (itemId == 'create_connected:fan_haunting_catalyst') {
            guiGraphics.blit(
                new ResourceLocation('kubejs:textures/decorator/soul_campfire.png'),
                ctx.xOffset + 8,
                ctx.yOffset + 8,
                8,
                8,
                0,
                0,
                16,
                16,
                16,
                16
            )
        } else if (itemId == 'create_connected:fan_splashing_catalyst') {
            guiGraphics.blit(
                new ResourceLocation('kubejs:textures/decorator/water_bucket.png'),
                ctx.xOffset + 8,
                ctx.yOffset + 8,
                8,
                8,
                0,
                0,
                16,
                16,
                16,
                16
            )
        }
    }
})

/**
 *
 * @param {Internal.ItemStack} stack
 * @returns {Internal.ItemStack[]}
 */
function getBundleContents(stack) {
    let nbt = stack.getNbt()
    if (nbt == null) return []
    let listTag = nbt.getList('Items', TAG_COMPOUND)
    return listTag
        .stream()
        .map(pTag => $ItemStack.of(pTag))
        .toList()
}

const otherBeltModeDecorator = RenderJSItemDecoratorHandler.registerForAllItem('otherbeltmode', ctx => {})

otherBeltModeDecorator.setRender(ctx => {
    const item = ctx.itemStack
    const guiGraphics = ctx.guiGraphics
    if (!item.isEmpty() && item.hasNBT()) {
        let nbt = item.getNbt()
        if (!nbt.contains('otherbeltmode')) return
        RenderJSRenderSystem.setShaderColorJS(1, 1, 1, 1)
        RenderJSRenderSystem.disableDepthTestJS()
        guiGraphics.blit(
            new ResourceLocation('kubejs:textures/decorator/otherbeltmode.png'),
            ctx.xOffset - 1,
            ctx.yOffset - 1,
            0,
            0,
            18,
            18,
            18,
            18
        )
    }
})
