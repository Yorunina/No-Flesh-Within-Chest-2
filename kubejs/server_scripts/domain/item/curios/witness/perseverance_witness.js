//priority: 500
// todo 添加获取方法
RegistryWitnessStrategy('kubejs:perseverance_witness', PerseveranceWitnessCuriosStrategy)
const PerseveranceWitnessEachSlotSizeDamage = 10000
/** 
* @param {*} customData 
* @param {Internal.LivingDamageEvent} event 
* @param {Internal.IDynamicStackHandler} stackHandler 
* @param {Internal.ItemStack} curiosItem 
* @param {number} slotIndex 
*/
function PerseveranceWitnessCuriosStrategy(customData, event, stackHandler, curiosItem, slotIndex) {
    if (!curiosItem.hasNBT()) curiosItem.setNbt(new $CompoundTag())
    const nbt = curiosItem.getNbt()
    let curDamage = nbt.getLong('damageAmount') + event.amount
    let slotMaxSize = 0
    while (curDamage > PerseveranceWitnessEachSlotSizeDamage) {
        slotMaxSize++
        curDamage = curDamage - PerseveranceWitnessEachSlotSizeDamage
    }
    if (slotMaxSize != 0 && !AStages.serverHasStage(FTBFinalTimerStart, event.server)) {
        let dimNet = DimensionsNet.getPrimaryNetFromPlayer(event.source.actual)
        if (dimNet) {
            let unifiedStorage = dimNet.getUnifiedStorage()
            unifiedStorage.setSlotMaxSize(unifiedStorage.slotMaxSize + slotMaxSize)
            nbt.putInt('slotMaxSize', nbt.getInt('slotMaxSize') + slotMaxSize)
        }
    }
    nbt.putLong('damageAmount', curDamage)
}