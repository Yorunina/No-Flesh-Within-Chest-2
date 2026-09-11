// priority: 1000
/**
 * 精英怪词条在 Jade 顶栏中的显示颜色
 * @type {Object<string, string>}
 */
const ChampionColorConfig = {}

/**
 * 注册精英怪词条的 Jade 显示颜色。词条 id 须与 ChampionStrategyModel 的 id 一致。
 * @param {string} affixId
 * @param {string} color 颜色，如 '#ec1aff'
 */
function RegistryChampionColor(affixId, color) {
    ChampionColorConfig[affixId] = color
}

RegistryChampionColor('split_on_death', '#ec1aff')
RegistryChampionColor('health_boost', '#66fc61')
RegistryChampionColor('damage_aura', '#e82102')
RegistryChampionColor('heal_aura', '#83fa7f')
RegistryChampionColor('speed_aura', '#e7fc32')
RegistryChampionColor('low_damage_restriction', '#00c6e4')
RegistryChampionColor('low_freq_protection', '#00c6e4')
RegistryChampionColor('high_damage_suppression', '#e49c00')
RegistryChampionColor('high_freq_protection', '#e49c00')


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