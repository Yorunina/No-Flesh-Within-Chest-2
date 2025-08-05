// priority: 500
// RenderJSEvents.AddWorldRender(event => {
//     event.addWorldRender((context) => {
//         // 生成巨型石头
//         let bufferSource = context.bufferSource
//         let poseStack = context.poseStack
//         let playerPos = Client.gameRenderer.getMainCamera().getPosition()
//         poseStack.pushPose()
//         let blockPos = new BlockPos(0, 80, 0)
//         poseStack.scale(100, 100, 100)
//         poseStack.translate(0.5, 0.5, 0.5)
//         Client.getBlockRenderer().renderSingleBlock(Blocks.STONE.defaultBlockState(), poseStack, bufferSource, 15, $OverlayTexture.NO_OVERLAY, $ModelData.EMPTY, null)
//         poseStack.popPose()
//     })
// })

// const $BlockEvent = Java.loadClass(
//     "net.minecraftforge.event.level.BlockEvent"
// );

// const DENY = 0;
// const DEFAULT = 1;
// const ALLOW = 2;

// ForgeEvents.onEvent($BlockEvent.CropGrowEvent.Pre, event => global.croplimiter(event))

// global.croplimiter = event => {
//     try { // for safety
//         let $level = event.getLevel()
//         let $pos = event.getPos();
//         let $block = $level.getBlockState($pos).getBlock();

//         let $biome = $level.getBiomeManager().getBiome($pos).get()
//         let $climate = $biome.getModifiedClimateSettings()

//         if ($climate.temperature() < 0.5) { // most of cold biomes like taiga will match this comditione
//             // let block_id_raw = $block.toString() // it gets block id in a format 'Block{minecraft:wheat}', hav no idea where else to look for a resourcelocation string thingy
//             // let block_id = block_id_raw.substring(6, block_id_raw.length() - 1) // it gets block id in a format 'minecraft:wheat'
//             // console.log("CropGrowEvent canceled: " + block_id + " in " + $climate.temperature())
//             event.setResult(DENY); // denies the event
//         }
//         else
//             event.setResult(DEFAULT); // dos not affects it

//     } catch (error) { 
//         console.log(error)
//     }
// }