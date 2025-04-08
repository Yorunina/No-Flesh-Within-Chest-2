// priority: 999
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
	event.icon = 'kubejs:infinity_beats'
	event.displayName = 'No Flesh Within Chest'
})
StartupEvents.registry("creative_mode_tab", event => {
    let tab = event.create("chest_thinker:tab");
    tab.icon(() => Item.of("chest_thinker:bloodmeat_ingot"));
    tab.displayName = Text.translatable("item_group.chest_thinker.name");
    tab.content(() => [
            "chest_thinker:bloodmeat_ingot",
			"chest_thinker:melted_bloodmeat_ingot_bucket"
   ]);
});
StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
     event.remove("chest_thinker:bloodmeat_ingot")
	 event.remove("chest_thinker:melted_bloodmeat_ingot_bucket")
});