// priority: 500
// BlockEvents.rightClicked(event => {
//     const player = event.player
//     const block = event.block
//     const state = block.getBlockState()
//     let nbt = new $CompoundTag()
//     let customTrade = new LightmansCustomTraderModel()
//     customTrade.addTrade(new LightmansTradeModel().addItem(Item.of('minecraft:oak_sapling')))
//     nbt.put('CustomTrader', customTrade.write())
//     block.mergeEntityData(nbt)
// })

ItemEvents.rightClicked('stick', event => {
    const player = event.player
    /**@type {Internal.ServerLevel} */
    const level = event.level
    const server = event.server


    // player.give(Item.of('create:schematic', '{Anchor:{X:0,Y:0,Z:0},Bounds:[18,22,20],Deployed:0b,File:"苹果乐.nbt",Mirror:"NONE",Owner:"prefab",Rotation:"NONE"}'))
    // SetDaySpeed(1)
    // SetNightSpeed(1)
    // UpdatePlaysTimeStabilityBar(server, level, player)


    // item.getImprovements(itemStack).forEach(pImprove => {
    //     console.log(pImprove.key, pImprove.level)
    // })
    // TetraJSUtils.addImprovement(itemStack, 'sword/blade', 'genesis_inspiration', 1)
    // $IModularItem.updateIdentifier(itemStack)
    // TetraDataManager.improvementData.data.forEach((resourceLocation, improvementList) => {
    //     console.log("group" + resourceLocation)
    //     improvementList.forEach(improvement => {
    //         console.log(improvement.key, improvement.infinite)
    //     })
    // })
    // item.getModuleFromSlot(itemStack, 'sword/blade').addImprovement(itemStack, 'blade/test', 1)

    // itemStack.getOrCreateTag().putInt('sword/blade' + ":" + 'blade/test', 1)
    // if (!TetraJSUtils.isModularItem(item)) return
    // item.getModuleAttributes(itemStack).forEach((attri, modifier) => {
    //     console.log(attri.descriptionId, modifier.name, modifier.getAmount())
    // })
    // let toolData = item.getToolData(itemStack)
    // toolData.levelMap.forEach((pEffect, num) => {
    //     console.log(pEffect.name(), num)
    // })
    // toolData.efficiencyMap.forEach((pEffect, num) => {
    //     console.log(pEffect.name(), num)
    // })


    // let effectData = item.getEffectData(itemStack)
    // effectData.levelMap.forEach((pEffect, num) => {
    //     console.log(pEffect.key, num)
    // })
    // effectData.efficiencyMap.forEach((pEffect, num) => {
    //     console.log(pEffect.key, num)
    // })
    // item.getImprovements(itemStack).forEach(pImprove => {

    //     console.log(pImprove.group, pImprove.efficiency)
    //     console.log(pImprove.key, pImprove.infinite)
    // })
    // item.getAllModules(itemStack).forEach(itemModule => {
    //     itemModule.setTweakStep(itemStack, 1)
    // })
    // console.log(item.getAttributeValue(itemStack, 'generic.attack_speed'))
    // item.getAttributeModifiers(itemStack).forEach((attri, modifier) => {
    //     console.log(attri.descriptionId, modifier.getAmount())
    // })

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


    // let cap = GetPlayerCuriosInventoryCap(player)
    // cap.getCurios().forEach((str, item) => {
    //     console.log(str)
    // })
    // SetDayDuration(server, 12000)

})

// CreateWaypoint(player, pos, new Date().toLocaleString(), 0xFAED34)


// BlockEvents.rightClicked(event => {
//     const player = event.player
//     if (!player.getMainHandItem().is('minecraft:stick')) return
//     const block = event.block
//     const state = block.getBlockState()
//     let nbt = new $CompoundTag()
    
//     nbt.put('CustomTrader', NBTIO.read('test.snbt'))
//     console.log(nbt)
//     block.mergeEntityData(nbt)
//     // let res = block.entityData.get('CustomTrader')
//     // NBTIO.write('test.snbt', res)
// })