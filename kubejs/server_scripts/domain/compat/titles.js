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
            .type('advancement')
            .build())
    }
    regsitryTitleSimple('beginner', 'uncommon')
    regsitryTitleSimple('chest_opener', 'uncommon')
    regsitryTitleSimple('mantle_extractor', 'rare')
    regsitryTitleSimple('assembly_line_builder', 'uncommon')
    regsitryTitleSimple('explore_multiworld', 'uncommon')
    regsitryTitleSimple('ender_dancer', 'epic')
    regsitryTitleSimple('world_machine_builder', 'epic')
    regsitryTitleSimple('multiworld_future', 'epic')
    regsitryTitleSimple('my_genesis', 'epic')
    regsitryTitleSimple('new_tinker', 'rare')
    regsitryTitleSimple('tinker_study', 'uncommon')
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
    regsitryTitleSimple('blast_soul', 'epic')
    regsitryTitleSimple('dim_worm', 'rare')
    regsitryTitleSimple('valley_echo', 'rare')
    regsitryTitleSimple('world_wound', 'rare')
    regsitryTitleSimple('rib_blade', 'rare')
    regsitryTitleSimple('forge_hammer', 'rare')
    regsitryTitleSimple('your_future', 'epic')
    regsitryTitleSimple('my_future', 'epic')
    regsitryTitleSimple('flesh_blob', 'uncommon')
    regsitryTitleSimple('adventure_story', 'epic')
    regsitryTitleSimple('sour_pickles', 'uncommon')
    regsitryTitleSimple('scapegoat', 'uncommon')
    regsitryTitleSimple('bring_up_me', 'epic')
    regsitryTitleSimple('primal_chestcavity', 'epic')
    regsitryTitleSimple('your_wife', 'rare') // todo 赞助者
    regsitryTitleSimple('sponsor', 'epic') // todo 赞助者
})