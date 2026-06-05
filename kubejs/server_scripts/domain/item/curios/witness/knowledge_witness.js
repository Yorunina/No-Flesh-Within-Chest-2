//priority: 500
RegistryWitnessStrategy('kubejs:knowledge_witness', KnowledgeWitnessCuriosStrategy)
const KnowledgeWitnessEachLevelDamage = 10000
/** 
* @param {*} customData 
* @param {Internal.LivingDamageEvent} event 
* @param {Internal.IDynamicStackHandler} stackHandler 
* @param {Internal.ItemStack} curiosItem 
* @param {number} slotIndex 
*/
function KnowledgeWitnessCuriosStrategy(customData, event, stackHandler, curiosItem, slotIndex) {
    if (!curiosItem.hasNBT()) curiosItem.setNbt(new $CompoundTag())
    /**@type {Internal.ServerPlayer} */
    const player = event.source.actual
    const nbt = curiosItem.getNbt()
    let curDamage = nbt.getLong('damageAmount') + event.amount
    if (curDamage > KnowledgeWitnessEachLevelDamage) {
        let exp = Math.floor(curDamage / KnowledgeWitnessEachLevelDamage) * 200
        curDamage = curDamage % KnowledgeWitnessEachLevelDamage
        let experienceAttr = player.getAttribute('attributeslib:experience_gained')
        if (experienceAttr) exp = experienceAttr.getValue() * exp
        $ExperienceOrb.award(player.level, player.position(), exp)
        nbt.putInt('expCount', nbt.getInt('expCount') + exp)
    }
    nbt.putLong('damageAmount', curDamage)
}

