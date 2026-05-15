// priority: 500
// const MOON_INSTANCE = new MoonDataModel()
// RenderJSEvents.modifyMoonSize(event => {
//     event.setMoonSize(MOON_INSTANCE.getMoonSize())
// })

// RenderJSEvents.changeMoonColor(event => {
//     const level = Client.level
//     let shaderColor = MOON_INSTANCE.getMoonShaderColor()
//     RenderSystem.setShaderColor(
//         shaderColor.r,
//         shaderColor.g,
//         shaderColor.b,
//         1 - level.getRainLevel(event.getPartialTick())
//     )
// })

// NetworkEvents.dataReceived('modify_moon', event => {
//     const data = event.data
//     if (!data) {
//         MOON_INSTANCE.reset()
//         return
//     }
//     if (data.contains('moonSize')) {
//         MOON_INSTANCE.setMoonSize(data.getInt('moonSize'))
//     }
//     if (data.contains('moonShaderColor')) {
//         let moonShaderColor = data.getList('moonShaderColor', TAG_FLOAT)
//         MOON_INSTANCE.setMoonShaderColor(
//             moonShaderColor.getFloat(0),
//             moonShaderColor.getFloat(1),
//             moonShaderColor.getFloat(2)
//         )
//     }
// })


// RenderJSEvents.bindCustomMoonTexture(event => {
//     event.setOverride()
//     const moonTextureId = event.getMoonTextureId()
//     RenderJSRenderSystem.setShaderTexture(moonTextureId, new ResourceLocation('kubejs:textures/item/organs/food/beer_gland.png'))
// })
