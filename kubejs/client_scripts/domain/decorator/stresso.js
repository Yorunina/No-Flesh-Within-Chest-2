// priority: 1000
const StressoDecorator = RenderJSItemDecoratorHandler.registerForAllItem('stresso', ctx => { })

StressoDecorator.setRender(ctx => {
    const item = ctx.itemStack
    const guiGraphics = ctx.guiGraphics
    RenderJSRenderSystem.depthMask(false)
    if (!item.isEmpty() && item.hasNBT()) {
        let nbt = item.getNbt()
        if (!nbt.contains('Stresso')) return
        let stressoNbt = nbt.getCompound('Stresso')
        let max = stressoNbt.contains('Max') ? stressoNbt.getInt('Max') : 100
        let cur = stressoNbt.contains('Cur') ? stressoNbt.getInt('Cur') : 0
        RenderJSRenderSystem.setShaderColorJS(1, 1, 1, 1)

        RenderJSUtils.fill(guiGraphics, ctx.xOffset + 2, ctx.yOffset + 14, ctx.xOffset + 15, ctx.yOffset + 15, 0, 0, 0, 255)
        if (max < cur) {
            RenderJSUtils.fill(guiGraphics, ctx.xOffset + 2, ctx.yOffset + 14, ctx.xOffset + 15, ctx.yOffset + 15, 255, 25, 0, 255)
        } else {
            RenderJSUtils.fill(guiGraphics, ctx.xOffset + 2, ctx.yOffset + 14, ctx.xOffset + cur / max * 13 + 2, ctx.yOffset + 15, 255, 220, 0, 255)
        }

    }
})