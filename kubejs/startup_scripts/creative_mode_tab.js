// priority: 999
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.setIcon('kubejs:heart')
	event.setDisplayName('No Flesh Within Chest')
	event.add(['maa:structure_selector', 'maa:biome_selector', 'maa:create_ore_excavation_selector'])
})