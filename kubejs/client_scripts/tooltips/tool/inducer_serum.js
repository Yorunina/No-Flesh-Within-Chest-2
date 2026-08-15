// priority: 800
const AnimalEntityTypes = ["minecraft:pig", "minecraft:cow", "minecraft:allay", "minecraft:armadillo", "minecraft:axolotl", "minecraft:bat", "minecraft:bee", "minecraft:camel", "minecraft:cat", "minecraft:chicken", "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:mooshroom", "minecraft:dolphin", "minecraft:fox", "minecraft:frog", "minecraft:tadpole", "minecraft:glow_squid", "minecraft:goat", "minecraft:horse", "minecraft:donkey", "minecraft:mule", "minecraft:llama", "minecraft:trader_llama", "minecraft:ocelot", "minecraft:panda", "minecraft:parrot", "minecraft:polar_bear", "minecraft:pufferfish", "minecraft:rabbit", "minecraft:sheep", "minecraft:sniffer", "minecraft:squid", "minecraft:sulfur_cube", "minecraft:turtle", "minecraft:wolf", "wildernature:bison", "wildernature:boar", "wildernature:cassowary", "wildernature:deer", "wildernature:dog", "wildernature:flamingo", "wildernature:hedgehog", "wildernature:minisheep", "wildernature:owl", "wildernature:pelican", "wildernature:penguin", "wildernature:raccoon", "wildernature:red_wolf", "wildernature:squirrel", "wildernature:turkey", "crittersandcompanions:dragonfly", "crittersandcompanions:dumbo_octopus", "crittersandcompanions:ferret", "crittersandcompanions:jumping_spider", "crittersandcompanions:koi_fish", "crittersandcompanions:ladybug", "crittersandcompanions:leaf_insect", "crittersandcompanions:otter", "crittersandcompanions:red_panda", "crittersandcompanions:roly_poly", "crittersandcompanions:sea_bunny", "crittersandcompanions:shima_enaga", "crittersandcompanions:snail", "crittersandcompanions:stag_beetle", "crittersandcompanions:stick_bug", "crittersandcompanions:weevil",]
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:animal_inducer_serum')
    .setShiftDescription(Text.translatable('tooltips.kubejs.inducer_serum.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.inducer_serum.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.inducer_serum.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.inducer_serum.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.animal_inducer_serum.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.animal_inducer_serum.shift.1'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const bioNbt = nbt.getCompound('biomancy:serum_data')
        const entityType = new ResourceLocation(AnimalEntityTypes[bioNbt.getInt('state')])
        return [
            Text.translatable('tooltips.kubejs.animal_inducer_serum.alt.1', Text.translatable(`entity.${entityType.namespace}.${entityType.path}`).gold())
        ]
    })
)