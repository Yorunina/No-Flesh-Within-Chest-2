// priority: 1000
RenderJSItemDecoratorHandler.register('chestcavity:surgical_box', 'surgical_box', ctx => {
    let item = ctx.itemStack
    if (!item.hasNBT()) return
    let nbt = item.getNbt()
    if (!nbt.contains('InventoryType')) return
    let injection = Item.of(`${nbt.getString('InventoryType')}_injection`)
    if (injection.isEmpty()) return
    let sprite = Client.getItemRenderer().getModel(injection, Client.level, null, 0).getParticleIcon()
    if (!sprite) return
    RenderJSRenderSystem.setShaderColorJS(1, 1, 1, 1)
    RenderJSRenderSystem.disableDepthTestJS()
    ctx.guiGraphics.blit(ctx.xOffset + 6, ctx.yOffset + 6, 0, 10, 10, sprite)
})
