// priority: 999
const OrganAddStatusEffectEvent = new OrganEventModel('organ_add_status_effect')

ChestCavityEvents.organAddStatusEffect(event => {
    const entity = event.entity
    let customData = {}
    OrganAddStatusEffectEvent.run(entity, customData, [event])
})

// 器官排异备选方案
// /**
//  * @param {Internal.Entity} entity
//  * @param {Internal.MobEffectInstance} effectInstance
//  */
// function organInjectionEffectAdded(entity, effectInstance) {
//     const chestCavity = entity.chestCavityInstance
//     if (!chestCavity) return
//     if (effectInstance.effect.equals($ForgeRegistries.MOB_EFFECTS.getValue('chestcavity:organ_rejection'))) {
//         let immunosuppression = chestCavity.getOrganScore('kubejs:immunosuppression')
//         if (Math.random() < immunosuppression / 10 + 0.1) {
//             let inventory = chestCavity.inventory
//             let targetIndex = Math.floor(Math.random() * inventory.getContainerSize())
//             let organItem = inventory.getStackInSlot(targetIndex)
//             if (!organItem) return
//             let compatibility = ChestCavityUtils.getCompatibility(chestCavity, organItem)
//             if (!compatibility) {
//                 ChestCavityUtils.setOrganCompatibility(chestCavity, organItem)
//             }
//         }
//     }
// }