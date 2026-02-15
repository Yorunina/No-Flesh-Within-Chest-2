// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:worm_neuron')
        .maxStackSize(1)
        .texture('kubejs:item/organs/infected/worm_neuron')
        .tag('kubejs:infected')

    event.create('kubejs:tumor')
        .texture('kubejs:item/organs/infected/tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')

    event.create('kubejs:unformed_tumor')
        .texture('kubejs:item/organs/infected/unformed_tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')

    event.create('kubejs:malignant_neuron_tumor')
        .texture('kubejs:item/organs/infected/malignant_neuron_tumor')
        .maxDamage(600)
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')

    event.create('kubejs:inactivated_neuron_tumor')
        .texture('kubejs:item/organs/infected/inactivated_neuron_tumor')
        .maxDamage(60)
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
})