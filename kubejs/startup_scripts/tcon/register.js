StartupEvents.registry("item", event => {
	let basicItem = event.create("chest_thinker:bloodmeat_ingot");
	let itemProperties = basicItem.createItemProperties();
	itemProperties.rarity('uncommon')
    basicItem.displayName(Component.translatable("item.chest_thinker.bloodmeat_ingot"))
    .texture("chest_thinker:item/bloodmeat_ingot")
    .maxStackSize(64)
	.tag('chest_thinker')
})
StartupEvents.registry('fluid', event => {
	event.create("chest_thinker:melted_bloodmeat_ingot")
		.thickTexture(0xC80616)
        .bucketColor(0xC80616)
        .displayName(Component.translatable("chest_thinker.melted.bloodmeat_ingot"));
})