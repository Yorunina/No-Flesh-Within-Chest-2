//priority: 500
RegistryWitnessStrategy('kubejs:story_witness', StoryWitnessCuriosStrategy)

const StoryWitnessLootList = [
    {damage: 10, lootList: [Item.of('acacia_button')]},
    {damage: 30, lootList: [Item.of('acacia_boat')]},
    {damage: 50, lootList: [Item.of('acacia_door')]}
]

/** 
* @param {*} customData 
* @param {Internal.LivingDamageEvent} event 
* @param {Internal.IDynamicStackHandler} stackHandler 
* @param {Internal.ItemStack} curiosItem 
* @param {number} slotIndex 
*/
function StoryWitnessCuriosStrategy(customData, event, stackHandler, curiosItem, slotIndex) {
    if (!curiosItem.hasNBT()) curiosItem.setNbt(new $CompoundTag())
    let nbt = curiosItem.getNbt()
    let curDamage = nbt.getLong('damageAmount') + event.amount
    let stage = nbt.getInt('stage')
    let lootList = []
    while (curDamage > StoryWitnessLootList[stage].damage) {
        lootList = lootList.concat(StoryWitnessLootList[stage].lootList)
        stage++
        if (stage >= StoryWitnessLootList.length) break
    }

    if (lootList.length > 0) {
        let source = event.source.actual
        SpawnLootAtLocation(source.level, source.blockPosition(), lootList)
    }

    if (stage >= StoryWitnessLootList.length) {
        stackHandler.setStackInSlot(slotIndex, Item.of('minecraft:amethyst_block'))
        return
    }
    nbt.putLong('damageAmount', curDamage)
    if (nbt.getInt('stage') != stage) nbt.putInt('stage', stage)
}
