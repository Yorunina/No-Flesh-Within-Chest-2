// priority: 500

TetraJSEvents.registerStatBar(event => {

    // event.registerEffectBar('source_leech')
    //     .setMin(0)
    //     .setMax(100)
    //     .setLabelGetter('percentagelabel')
    //     .addOneDecimalTooltip(TetraJS$StatBarHelper.effectLevel('source_leech', 1.0))

    // const AirAttunementGetter = TetraJS$StatBarHelper.effectLevel('air_attunement', 1.0)
    // const EarthAttunementGetter = TetraJS$StatBarHelper.effectLevel('earth_attunement', 1.0)
    // const FireAttunementGetter = TetraJS$StatBarHelper.effectLevel('fire_attunement', 1.0)
    // const WaterAttunementGetter = TetraJS$StatBarHelper.effectLevel('water_attunement', 1.0)
    // event.registerEffectBar('spellstrike_power')
    //     .setMin(0)
    //     .setMax(6)
    //     .setLabelGetter('integerlabel')
    //     .addOneDecimalTooltip(TetraJS$StatBarHelper.effectLevel('spellstrike_power', 1.0))
    //     .setShowCheck((player, currentStack, previewStack, statGetter) => {
    //         let isAir = AirAttunementGetter.getValue(player, currentStack) > 0 || AirAttunementGetter.getValue(player, previewStack) > 0
    //         let isEarth = EarthAttunementGetter.getValue(player, currentStack) > 0 || EarthAttunementGetter.getValue(player, previewStack) > 0
    //         let isFire = FireAttunementGetter.getValue(player, currentStack) > 0 || FireAttunementGetter.getValue(player, previewStack) > 0
    //         let isWater = WaterAttunementGetter.getValue(player, currentStack) > 0 || WaterAttunementGetter.getValue(player, previewStack) > 0
    //         return isAir || isEarth || isFire || isWater || statGetter.shouldShow(player, currentStack, previewStack)
    //     })
    //     .addStatIndicator(
    //         new $GuiStatIndicator(0, 0, 'tetra.stats.air_attunement', 1, AirAttunementGetter, new $TooltipGetterInteger('tetra.stats.air_attunement.tooltip', AirAttunementGetter))
    //     )
    //     .addStatIndicator(
    //         new $GuiStatIndicator(0, 0, 'tetra.stats.earth_attunement', 3, EarthAttunementGetter, new $TooltipGetterInteger('tetra.stats.earth_attunement.tooltip', EarthAttunementGetter))
    //     )
    //     .addStatIndicator(
    //         new $GuiStatIndicator(0, 0, 'tetra.stats.fire_attunement', 0, FireAttunementGetter, new $TooltipGetterInteger('tetra.stats.fire_attunement.tooltip', FireAttunementGetter))
    //     )
    //     .addStatIndicator(
    //         new $GuiStatIndicator(0, 0, 'tetra.stats.water_attunement', 2, WaterAttunementGetter, new $TooltipGetterInteger('tetra.stats.water_attunement.tooltip', WaterAttunementGetter))
    //     )
    // event.registerEffectBar('spellstrike_duration')
    //     .setMin(0)
    //     .setMax(7)
    //     .setInverted(true)
    //     .setLabelGetter('decimallabelinverted')
    //     .addOneDecimalTooltip(TetraJS$StatBarHelper.effectEfficiency('spellstrike_duration', 100.0, 0))
})

