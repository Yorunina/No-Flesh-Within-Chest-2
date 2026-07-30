// priority: 800
const WorldTokenGameRuleList = ['disableRaids', 'doDaylightCycle', 'doEntityDrops', 'doFireTick', 'doInsomnia', 'doMobLoot', 'doMobSpawning', 'doPatrolSpawning', 'doTraderSpawning', 'doVinesSpread', 'doWardenSpawning', 'doWeatherCycle', 'drowningDamage', 'fallDamage', 'fireDamage', 'freezeDamage', 'keepInventory', 'keepWallet', 'mobExplosionDropDecay', 'mobGriefing', 'naturalRegeneration', 'showDeathMessages', 'tntExplosionDropDecay', 'waterSourceConversion']

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:world_token_gamerule')
    .setShiftDescription(Text.translatable('tooltips.kubejs.world_token.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.world_token.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.world_token.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.world_token.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.world_token_gamerule.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.world_token_gamerule.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.world_token_gamerule.shift.2'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const state = nbt.getInt('state')
        return [
            Text.translatable('tooltips.kubejs.world_token_gamerule.alt.1', Text.gold(WorldTokenGameRuleList[state]))
        ]
    })
)


const WorldTokenCreativeList = ['create:creative_blaze_cake', 'create:creative_motor', 'minecraft:command_block', 'ars_nouveau:creative_source_jar', 'ars_nouveau:creative_spell_book', 'functionalstorage:max_storage_upgrade', 'sophisticatedbackpacks:stack_upgrade_omega_tier', 'sophisticatedbackpacks:inception_upgrade']

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:world_token_creative')
    .setShiftDescription(Text.translatable('tooltips.kubejs.world_token.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.world_token.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.world_token.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.world_token.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.world_token_creative.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.world_token_creative.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.world_token_creative.shift.2'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const state = nbt.getInt('state')
        return [
            Text.translatable('tooltips.kubejs.world_token_creative.alt.1', Item.of(WorldTokenCreativeList[state]).displayName)
        ]
    })
)


const WorldTokenWeatherList = ['clear', 'rain', 'thunder']

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:world_token_weather')
    .setShiftDescription(Text.translatable('tooltips.kubejs.world_token.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.world_token.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.world_token.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.world_token.alt_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.world_token_weather.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.world_token_weather.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.world_token_weather.shift.2'))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const state = nbt.getInt('state')
        return [
            Text.translatable('tooltips.kubejs.world_token_weather.alt.1', Text.translatable(`weather.kubejs.${WorldTokenWeatherList[state]}`).gold())
        ]
    })
)