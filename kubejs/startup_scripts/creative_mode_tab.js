// priority: 999
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.setIcon('kubejs:candy_heart')
	event.setDisplayName('No Flesh Within Chest')
	event.add([TetraJSUtils.setupScrollData('test', 'test', [], [], true, 1, 0x000000, [15, 14, 15, 15])])
	
})
// StartupEvents.registry("creative_mode_tab", event => {
//     let tab = event.create("chest_thinker:tab");
//     tab.icon(() => Item.of("chest_thinker:bloodmeat_ingot"));
//     tab.displayName = Text.translatable("item_group.chest_thinker.name");
//     tab.content(() => [
//             "chest_thinker:bloodmeat_ingot",
// 			"chest_thinker:melted_bloodmeat_ingot_bucket"
//    ])
// })

