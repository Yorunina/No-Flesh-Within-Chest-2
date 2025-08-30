// priority: 500
// todo kubeloader加回来

// ExposureEvents.modifyFrameData(event => {
//     const player = event.player
//     const server = event.server
//     let entityInFrame = event.getEntitiesInFrame()
//     let frameData = event.getFrame()

//     let target = entityInFrame.get(0)

//     let targetNbt = target.getNbt()
//     let targetId = target.type
//     frameData.putString('type', targetId)
//     frameData.put('entityNbt', targetNbt)
//     server.scheduleInTicks(2, () => {
//         target.discard()
//     })
// })
// exposure:flashes


// ItemEvents.rightClicked('exposure:photograph', event => {
//     const level = event.level
//     const item = event.item
//     const player = event.player
//     let itemNbt = item.getNbt()
//     if (itemNbt.contains('type')) {
//         let targetNbt = itemNbt.get('entityNbt')
//         let targetId = itemNbt.getString('type')
//         let entity = level.createEntity(targetId)
//         entity.setNbt(targetNbt)
//         entity.setPos(player.getX(), player.getY(), player.getZ())
//         entity.spawn()
//     }
//     item.shrink(1)
// })

// todo 调试方法
ItemEvents.rightClicked('stick', event => {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    /**@type {Internal.ServerLevel} */
    const level = event.level
    const server = event.server
    player.sendData('apply_visual_effect')
    // let blockSummon = new $AnimBlockSummon(level, Blocks.SAND.defaultBlockState())
    // blockSummon.setColor(0X00c9b5)
    // blockSummon.setPos(player.blockPosition())
    // blockSummon.setTicksLeft(20 * 60)
    // level.addFreshEntity(blockSummon)
    // let nbt = new $CompoundTag()
    // nbt.putString('SkullOwner', 'YoruNina')
    // let blockSummon = new $AnimHeadSummon(level, Blocks.PLAYER_HEAD.defaultBlockState(), nbt)
    // blockSummon.setColor(0X00c9b5)
    // blockSummon.setPos(player.blockPosition())
    // blockSummon.setTicksLeft(20 * 60)
    // level.addFreshEntity(blockSummon)

    // let cap = GetPlayerCuriosInventoryCap(player)
    // cap.getCurios().forEach((str, item) => {
    //     console.log(str)
    // })
    // SetDayDuration(server, 12000)

    // let tempSphere = new SphereModel()
    //     .setShellProperties(Block.getBlock('minecraft:glass').defaultBlockState(), 5, 1)
    // let tempSphere = new GeodeSphereModel()
    //     .addVein(Block.getBlock('minecraft:diamond_block').defaultBlockState(), 23, 'cloud')
    //     .setFillBlock(Block.getBlock('minecraft:glass').defaultBlockState())
    //     .setShellProperties(Block.getBlock('minecraft:glass').defaultBlockState(), 24, 1)
    // tempSphere.generateSphere(level, player.block.getPos().atY(100))

    // Ingredient.of('#minecraft:dirt').getStacks().forEach(stack => {
    //     console.log(stack)
    // })
})

// CreateWaypoint(player, pos, new Date().toLocaleString(), 0xFAED34)