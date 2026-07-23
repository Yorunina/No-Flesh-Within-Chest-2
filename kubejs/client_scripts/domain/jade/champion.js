// priority: 500
const ChampionColorConfig = {
    'split_on_death': '#ec1aff',
    'health_boost': '#66fc61',
    'damage_aura': '#e82102',
    'heal_aura': '#83fa7f',
    'speed_aura': '#e7fc32',
    'low_damage_restriction': '#00c6e4',
    'low_freq_protection': '#00c6e4',
    'high_damage_suppression': '#e49c00',
    'high_freq_protection': '#e49c00',
}


JadeEvents.onClientRegistration(event => {
    event.entity('kubejs:champion_key', $PathfinderMob)
        .tooltip((toolTip, accessor, config) => {
            const jadeTitle = GenChampionJadeTitle(accessor.serverData)
            if (!jadeTitle || jadeTitle.isEmpty()) return
            toolTip["add(int,net.minecraft.network.chat.Component)"](1, jadeTitle)
        })
})

/**
 * @param {Internal.CompoundTag} tag 
 * @returns {Internal.MutableComponent}
 */
function GenChampionJadeTitle(tag) {
    if (!tag) return
    const championTag = tag.getCompound('champion')
    if (!championTag || championTag.isEmpty()) return

    const jadeTitle = Component.empty()
    let index = 0
    championTag.tags.forEach((key, value) => {
        if (index > 0) jadeTitle.append(Text.of(' / ').darkGray())
        jadeTitle.append(Text.translatable(`champion.affix.${key}.name`, ToRomanNumeral(value)).color(ChampionColorConfig[key]))
        index++
    })
    return jadeTitle
}