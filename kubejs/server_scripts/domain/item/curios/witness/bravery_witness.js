//priority: 500
RegistryWitnessStrategy('kubejs:bravery_witness', BraveryWitnessCuriosStrategy)
const BraveryWitnessEachItemDamage = 10000
/** 
* @param {*} customData 
* @param {Internal.LivingDamageEvent} event 
* @param {Internal.IDynamicStackHandler} stackHandler 
* @param {Internal.ItemStack} curiosItem 
* @param {number} slotIndex 
*/
function BraveryWitnessCuriosStrategy(customData, event, stackHandler, curiosItem, slotIndex) {
    if (!curiosItem.hasNBT()) curiosItem.setNbt(new $CompoundTag())
    /**@type {Internal.ServerPlayer} */
    const player = event.source.actual
    const nbt = curiosItem.getNbt()
    let curDamage = nbt.getLong('damageAmount') + event.amount
    if (curDamage > 0) {
        let itemCounts = Math.floor(curDamage / BraveryWitnessEachItemDamage)
        curDamage = curDamage % BraveryWitnessEachItemDamage
        player.give(Item.of('minecraft:netherite_scrap', itemCounts))
        nbt.putInt('itemCounts', nbt.getInt('itemCounts') + itemCounts)
    }
    nbt.putLong('damageAmount', curDamage)
}