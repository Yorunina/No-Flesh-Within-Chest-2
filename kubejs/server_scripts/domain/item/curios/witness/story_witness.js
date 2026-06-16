//priority: 500
RegistryWitnessStrategy('kubejs:story_witness', StoryWitnessCuriosStrategy)

const StoryWitnessLootList = [
    { damage: 100, lootList: [Item.of('minecraft:iron_ingot', 8)] },
    { damage: 500, lootList: [Item.of('minecraft:diamond', 3)] },
    { damage: 1000, lootList: [Item.of('kubejs:fox_tail')] },
    { damage: 3000, lootList: [Item.of('kubejs:koi_fish_scale')] },
    { damage: 5000, lootList: [Item.of('tetra:geode', 8)] },
    { damage: 10000, lootList: [Item.of('kubejs:bravery_witness')] },
    { damage: 50000, lootList: [Item.of('kubejs:perseverance_witness')] },
    { damage: 100000, lootList: [Item.of('kubejs:knowledge_witness')] },
    { damage: 1000000, lootList: [Item.of('cataclysm:altar_of_fire')] },
    { damage: 5000000, lootList: [Item.of('minecraft:warden_spawn_egg')] },
    { damage: 10000000, lootList: [Item.of('minecraft:potion', '{Potion:"potioncore:flight"}')] },
    { damage: 50000000, lootList: [Item.of('create:creative_blaze_cake')] },
    { damage: 100000000, lootList: [Item.of('kaleidoscope_cookery:sakura_fubuki')] },
    { damage: 500000000, lootList: [Item.of('chisel:futura/controller')] },
    { damage: 1000000000, lootList: [Item.of('kaleidoscope_cookery:transmutation_lunch_bag')] }
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
        stackHandler.setStackInSlot(slotIndex, Item.of('kubejs:story_proof'))
        return
    }
    nbt.putLong('damageAmount', curDamage)
    if (nbt.getInt('stage') != stage) nbt.putInt('stage', stage)
}
