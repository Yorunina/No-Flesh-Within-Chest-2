// priority: 1000
/**
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
            .texture(`kubejs:item/serums/${name}_inducer_serum`)
            .serum(`kubejs:${name}_inducer`)
            .tag('kubejs:induction_serum')
    })
}

StartupEvents.registry('item', event => {
    event.create(`kubejs:empty_inducer_serum`)
        .texture(`kubejs:item/serums/empty_inducer_serum`)
})

RegistryEntityInducerSerumFromFleshBlob('minecraft:pig', 'pig', 6000)
RegistryEntityInducerSerumFromFleshBlob('minecraft:cow', 'cow', 6000)

StartupEvents.registry('item', event => {
    event.create(`kubejs:alpha_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/alpha_pheromone_serum`)
        .serum(`kubejs:alpha_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:beta_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/beta_pheromone_serum`)
        .serum(`kubejs:beta_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:gamma_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/gamma_pheromone_serum`)
        .serum(`kubejs:gamma_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:precursor_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/precursor_pheromone_serum`)
        .serum(`kubejs:precursor_pheromone`)
})

StartupEvents.registry('biomancy:serum', event => {
    event.create(`kubejs:alpha_pheromone`)
    event.create(`kubejs:beta_pheromone`)
    event.create(`kubejs:gamma_pheromone`)
    event.create(`kubejs:precursor_pheromone`)
})