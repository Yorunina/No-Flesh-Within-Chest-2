// priority: 500
// function TimeBarModel(maxTime) {
//     this.maxTime = maxTime
//     this.time = 0
//     return this
// }

// const BossTimeBar = [
//     new TimeBarModel(1200),
// ]

// RenderJSEvents.AddGuiRender(event => {
//     event.addRender(context => {
//         var screenW = context.window.guiScaledWidth / 2//x轴缩放中心
//         var screenH = context.window.guiScaledHeight / 2//y轴缩放中心
//         for (let i = 0; i < BossTimeBar.length; i++) {
//             let timeBar = BossTimeBar[i]
//             let height = screenH * timeBar.time / timeBar.maxTime
//             context.guiGraphics.blit(new ResourceLocation("minecraft:textures/gui/icons.png"), screenW, height, 53, 0, 9, 9)//在setShaderTextureJS里设置的材质中从(53,0)开始向右和向下截取9个像素
//         }

//     })
// })

// ClientEvents.tick(event => {
//     let removeList = []
//     for (let i = 0; i < BossTimeBar.length; i++) {
//         let timeBar = BossTimeBar[i]
//         timeBar.time++
//         if (timeBar.time >= timeBar.maxTime) {
//             removeList.push(i)
//         }
//     }
//     for (let i = 0; i < removeList.length; i++) {
//         BossTimeBar.splice(removeList[i], 1) 
//     }
// })