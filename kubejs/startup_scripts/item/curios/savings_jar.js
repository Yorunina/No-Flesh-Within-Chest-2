// priority: 1000
StartupEvents.registry('minecraft:item', event => {
    RegistrySavingsJarItem(event, 'rank_savings_jar')
    RegistrySavingsJarItem(event, 'health_savings_jar')
    RegistrySavingsJarItem(event, 'armor_savings_jar')
    RegistrySavingsJarItem(event, 'attack_savings_jar')
    RegistrySavingsJarItem(event, 'mutated_savings_jar')
})

/**
 * @param {Internal.ItemRegistryEventJS} event
 * @param {string} id
 */
function RegistrySavingsJarItem(event, id) {
    event.create(id, 'basic')
        .texture(`kubejs:item/curios/${id}`)
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:savings_jar')
}
