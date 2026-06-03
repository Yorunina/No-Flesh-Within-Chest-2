//priority: 500
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
    if (curDamage > 0) {
        let slotMaxSize = Math.floor(curDamage / PerseveranceWitnessEachSlotSizeDamage)
        curDamage = curDamage % PerseveranceWitnessEachSlotSizeDamage
        if (slotMaxSize != 0 && !AStages.serverHasStage(FTBFinalTimerStart, event.entity.server)) {
            let dimNet = DimensionsNet.getPrimaryNetFromPlayer(event.source.actual)
            if (dimNet) {
                let unifiedStorage = dimNet.getUnifiedStorage()
                unifiedStorage.setSlotMaxSize(unifiedStorage.slotMaxSize + slotMaxSize)
                nbt.putInt('slotMaxSize', nbt.getInt('slotMaxSize') + slotMaxSize)
            }
        }
    }
    nbt.putLong('damageAmount', curDamage)
}