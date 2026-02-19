// priority: 500
// todo kubeloader加回来
BlockEvents.rightClicked('biomancy:malignant_flesh_veins', event => {
    const block = event.block
    const level = event.level
    block.blockState.randomTick(level, block.pos, level.random)
})
// MAAEvents.textInputTaskSubmit('test', (event) => {
//     const player = event.player
//     const inputText = event.inputText
//     if (inputText == '我要钱') {
//         player.give(Item.of('lightmanscurrency:coin_gold'))
//     } else if (inputText == '够了不要了') {
//         event.teamData.addProgress(event.task, 1)
//     }
// })

// todo 调试方法
ItemEvents.rightClicked('stick', event => {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    /**@type {Internal.ServerLevel} */
    const level = event.level
    const server = event.server
    // level.playSound(null, player.getX(), player.getY(), player.getZ(), 'ui.toast.challenge_complete', player.getSoundSource(), 0.5, 1)
    // AddSkinToSlot(player, 'chest', 'burning_heart_arms')
    // SetDaySpeed(0.1)
    // UpdatePlaysTimeStabilityBar(server, level, player)
    // /**@type {Internal.PathfinderMob} */
    // let leader = level.createEntity('minecraft:zombie')
    // leader.potionEffects.add('minecraft:glowing', 20 * 60, 0)
    // leader.persistentData.put('patrolTarget',
    //     {
    //         'patrolling': NBT.intTag(1), 'x': NBT.floatTag(0), 'y': NBT.floatTag(70), 'z': NBT.floatTag(0)
    //     }
    // )
    // LongDistancePatrolGoal(leader)

    // let entity = level.createEntity('pig')
    // entity.potionEffects.add('minecraft:glowing', 20 * 60, 0)
    // entity.persistentData.put('patrolTarget',
    //     {
    //         'patrolling': NBT.intTag(1), 'x': NBT.floatTag(0), 'y': NBT.floatTag(70), 'z': NBT.floatTag(0)
    //     }
    // )
    // LongDistancePatrolGoal(entity)



    // let defaultData = server.persistentData.getInt('default')
    // player.tell('defaultData: ' + defaultData)

    // player.sendData('apply_visual_effect')
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


// .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
//     if (stack.getCount() != 1 || action != $ClickAction.SECONDARY || !slot.allowModification(player)) return false
//     if (oStack.isEmpty()) {
//         RemoveBundleOneStack(stack).ifPresent(pStack => {
//             PlayBundleRemoveSound(player)
//             access.set(pStack)
//         })
//     } else if (oStack.is('ars_nouveau:source_jar')) {
//         let added = AddItemIntoBundle(stack, oStack, 4, (pStack) => 1)
//         if (added > 0) {
//             PlayerBundleInsertSound(player)
//             oStack.shrink(added)
//         }
//     }
//     return true
// })
// .overrideStackedOnOther((stack, slot, action, player) => {
//     if (stack.getCount() != 1 || action != $ClickAction.SECONDARY) return false
//     let oStack = slot.getItem()
//     if (oStack.isEmpty()) {
//         PlayBundleRemoveSound(player)
//         RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
//     } else if (oStack.is('ars_nouveau:source_jar')) {
//         let added = AddItemIntoBundle(stack, slot.safeTake(oStack.getCount(), 65535, player), 4, (pStack) => 1)
//         if (added > 0) PlayerBundleInsertSound(player)
//     }
//     return true
// })
// .barWidth((stack) => {
//     let stackList = GetBundleContents(stack)
//     return Math.min(1 + 12 * stackList.length / 4, 13)
// })
// .barColor(() => Color.DARK_BLUE)
// .tooltipImage((stack) => {
//     let itemList = $NonNullList.create()
//     GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
//     return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
// })
// .canFitInsideContainerItems(false)