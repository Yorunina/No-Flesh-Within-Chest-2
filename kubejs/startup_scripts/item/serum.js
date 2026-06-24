// priority: 1000
/**
 * 
 * @param {Internal.EntityType} targetEntityType 
 * @param {string} name 
 * @param {number} time 
 */
function RegistryEntityInducerSerumFromFleshBlob(targetEntityType, name, time) {
    StartupEvents.registry('biomancy:serum', event => {
        event.create(`kubejs:${name}_inducer`)
            .canAffectEntity((level, serumData, source, target) => target instanceof $FleshBlob)
            .affectEntity((level, serumData, source, target) => {
                if (target instanceof $FleshBlob) {
                    target.persistentData.putString('inducerEntityType', targetEntityType)
                    target.potionEffects.add('kubejs:differentiation_induction', time, 0)
                }
            })
            .canAffectPlayerSelf((level, serumData, targetSelf) => true)
            .affectPlayerSelf((level, serumData, targetSelf) => {
                targetSelf.potionEffects.add('kubejs:differentiation_induction', time, 0)
            })
    })
    StartupEvents.registry('item', event => {
        event.create(`kubejs:${name}_inducer_serum`, 'biomancy:basic_serum')
            .texture(`kubejs:item/inducer/${name}_inducer_serum`)
            .serum(`kubejs:${name}_inducer`)
            .tag('kubejs:induction_serum')
    })
}

RegistryEntityInducerSerumFromFleshBlob('minecraft:pig', 'pig', 6000)
