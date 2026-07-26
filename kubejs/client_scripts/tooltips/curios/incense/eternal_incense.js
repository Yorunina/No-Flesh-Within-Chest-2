// priority: 900
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:eternal_incense')
    .setShiftDescription(Text.translatable('tooltips.kubejs.incense.shift.1'))
    .setShiftHoldingDescription(Text.translatable('tooltips.kubejs.incense.shift_holding.1'))
    .setAltDescription(Text.translatable('tooltips.kubejs.incense.alt.1'))
    .setAltHoldingDescription(Text.translatable('tooltips.kubejs.incense.alt_holding.1'))
    .setCtrlDescription(Text.translatable('tooltips.kubejs.incense.ctrl.1'))
    .setCtrlHoldingDescription(Text.translatable('tooltips.kubejs.incense.ctrl_holding.1'))
    .addDefault(Text.translatable('tooltips.kubejs.eternal_incense.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.eternal_incense.shift.1', RelicsBossHover))
    .addAlt(Text.translatable('tooltips.kubejs.eternal_incense.alt.1', RelicsBossHover))
    .addAlt((text, item) => {
        const nbt = item.getOrCreateTag()
        const relicsKills = nbt.getInt('relicsKills') + 1
        const championLevel = Math.min(Math.ceil(relicsKills / 10), 3)
        const championLevelStr = Text.gold(championLevel.toFixed(0))
        const res = RotatingTooltip([
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionHighFreqProtectionHover, championLevelStr).gray(),
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionLowFreqProtectionHover, championLevelStr).gray(),
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionHighDamageSuppressionHover, championLevelStr).gray(),
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionLowDamageRestrictionHover, championLevelStr).gray(),
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionChaosProtectionHover, championLevelStr).gray(),
            Text.translatable('tooltips.kubejs.eternal_incense.alt.3', ChampionPurityProtectionHover, championLevelStr).gray(),
        ], 500)(text, item)
        res.push(Text.translatable('tooltips.kubejs.eternal_incense.alt.2', Text.of((championLevel * 20).toFixed(0)).gold(), Text.of((championLevel * 20 + 100).toFixed(0)).gold()).gray())
        return res
    })
    .addCtrl(Text.translatable('tooltips.kubejs.eternal_incense.ctrl.1', RelicsBossHover, EngraveHover))
    .addCtrl(Text.translatable('tooltips.kubejs.eternal_incense.ctrl.2', ItemCoverHover, EngraveHover))
    .addCtrl((text, item) => {
        const nbt = item.getOrCreateTag()
        const lootTimes = nbt.getInt('lootTimes') + 1
        const relicsKills = nbt.getInt('relicsKills') + 1
        return [
            Text.translatable('tooltips.kubejs.eternal_incense.ctrl.3', ExtremeStrengthHover, RoundFix(relicsKills * 0.1, 1), ExtremeFitnessHover, RoundFix(lootTimes * 0.01, 2)).gray(),
        ]
    })
)