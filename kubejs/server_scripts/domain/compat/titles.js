// priority: 500
TitlesEvent.onTitleRegistry(event => {
    /**
     * @param {String} id 
     * @param {Internal.Rarity_} rarity
     * @returns {Internal.Title$Builder}
     */
    function regsitryTitleSimple(id, rarity) {
        event.addTitle(event.create('kubejs:' + id)
            .defaultDisplay(`titles.kubejs.${id}.defaultDisplay`)
            .variantDisplay(`titles.kubejs.${id}.variantDisplay`)
            .flavorText(`titles.kubejs.${id}.flavorText`)
            .setPrefix()
            .rarity(rarity)
            .build())
    }
    regsitryTitleSimple('beginner', 'uncommon')
    regsitryTitleSimple('chest_opener', 'uncommon')
    regsitryTitleSimple('mantle_extractor', 'rare')
    regsitryTitleSimple('assembly_line_builder', 'uncommon')
    regsitryTitleSimple('explore_multiworld', 'uncommon')
    regsitryTitleSimple('ender_dancer', 'epic') // todo 末地任务
    regsitryTitleSimple('world_machine_builder', 'epic')
    regsitryTitleSimple('multiworld_future', 'epic')
    regsitryTitleSimple('my_genesis', 'epic')
    regsitryTitleSimple('new_tinker', 'uncommon') // todo 匠魂教程初始的几个任务里
    regsitryTitleSimple('tinker_study', 'rare')
    regsitryTitleSimple('gearsmith', 'uncommon')
    regsitryTitleSimple('eternal_winter', 'epic')
    regsitryTitleSimple('heart_warm', 'epic')
    regsitryTitleSimple('sun_flower', 'epic')
    regsitryTitleSimple('gate_observer', 'uncommon')
    regsitryTitleSimple('gate_conqueror', 'rare')
    regsitryTitleSimple('gate_smasher', 'rare')
    regsitryTitleSimple('gate_buster', 'rare')
    regsitryTitleSimple('gate_ruler', 'epic')
    regsitryTitleSimple('mechanics_scholar', 'epic')
    regsitryTitleSimple('frost_melter', 'epic')
    regsitryTitleSimple('sponsor', 'epic')
})