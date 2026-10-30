// priority: 900
RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:basin')
        .addDefault(Text.translatable('tooltips.kubejs.basin.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.basin.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.basin.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:belt_connecter')
        .addDefault(Text.translatable('tooltips.kubejs.belt_connecter.default.1').gray())
        .addCtrl(AutomationSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.belt_connecter.ctrl.1'))
        .addCtrl(Text.translatable('tooltips.kubejs.belt_connecter.ctrl.2', KeyActiveHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:brass_funnel')
        .addDefault(Text.translatable('tooltips.kubejs.brass_funnel.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.brass_funnel.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.brass_funnel.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:crushing_wheel')
        .addDefault(Text.translatable('tooltips.kubejs.crushing_wheel.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.crushing_wheel.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.crushing_wheel.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.crushing_wheel.alt.3', StressHover))
        .addCtrl(FastWorkingSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.crushing_wheel.ctrl.1', KeyActiveHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:deployer')
        .addDefault(Text.translatable('tooltips.kubejs.deployer.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.deployer.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.deployer.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.deployer.alt.3'))
        .addCtrl(FastWorkingSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.deployer.ctrl.1', KeyActiveHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:encased_fan')
        .addDefault(Text.translatable('tooltips.kubejs.encased_fan.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.3', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.4', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.5', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.encased_fan.alt.6', StressHover))
        .addCtrl(FastWorkingSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.encased_fan.ctrl.1', KeyActiveHover))
        .addCtrl(DigestSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.encased_fan.ctrl.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:factory_heart')
        .addDefault(Text.translatable('tooltips.kubejs.factory_heart.default.1').gray())
        .addCtrl(FactoryCoreSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.factory_heart.ctrl.1', FactoryHeartOrganScoreUniqueHover))
        .addCtrl(Text.translatable('tooltips.kubejs.factory_heart.ctrl.2', FactoryHeartUniqueHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:genius')
        .addDefault(Text.translatable('tooltips.kubejs.genius.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.genius.alt.1', KeyActiveHover))
        .addAlt(Text.translatable('tooltips.kubejs.genius.alt.2', KeyActiveHover))
        .addAlt(Text.translatable('tooltips.kubejs.genius.alt.3', StressHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:item_drain')
        .addDefault(Text.translatable('tooltips.kubejs.item_drain.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.item_drain.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.item_drain.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.item_drain.alt.3', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.item_drain.alt.4'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:magnetic_stomach')
        .addDefault(ItemDirectionTooltip)
        .addAlt(Text.translatable('tooltips.kubejs.magnetic_stomach.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.magnetic_stomach.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.magnetic_stomach.alt.3'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:mechanical_drill')
        .addDefault(Text.translatable('tooltips.kubejs.mechanical_drill.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_drill.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_drill.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:mechanical_mixer')
        .addDefault(Text.translatable('tooltips.kubejs.mechanical_mixer.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_mixer.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_mixer.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_mixer.alt.3', StressHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:mechanical_press')
        .addDefault(Text.translatable('tooltips.kubejs.mechanical_press.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_press.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_press.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_press.alt.3', StressHover))
        .addCtrl(FastWorkingSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.mechanical_press.ctrl.1', KeyActiveHover))
        .addCtrl(MachinaryLubricantSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.mechanical_press.ctrl.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:mechanical_saw')
        .addDefault(Text.translatable('tooltips.kubejs.mechanical_saw.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_saw.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_saw.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_saw.alt.3', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.mechanical_saw.alt.4'))
        .addCtrl(FastWorkingSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.mechanical_saw.ctrl.1', KeyActiveHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:mechanized_belt')
        .addDefault(Text.translatable('tooltips.kubejs.mechanized_belt.default.1').gray())
        .addCtrl(MachinaryLubricantSlotType)
        .addCtrl(Text.translatable('tooltips.kubejs.mechanized_belt.ctrl.1'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:output_brass_funnel')
        .addDefault(Text.translatable('tooltips.kubejs.output_brass_funnel.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.output_brass_funnel.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.output_brass_funnel.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:purgatory')
        .addDefault(Text.translatable('tooltips.kubejs.purgatory.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.purgatory.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.purgatory.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:recovery_spleen')
        .addDefault(Text.translatable('tooltips.kubejs.recovery_spleen.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.recovery_spleen.alt.1'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:smart_chute')
        .addDefault(Text.translatable('tooltips.kubejs.smart_chute.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.smart_chute.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.smart_chute.alt.2'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:spout')
        .addDefault(Text.translatable('tooltips.kubejs.spout.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.spout.alt.1', StressHover))
        .addAlt(Text.translatable('tooltips.kubejs.spout.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.spout.alt.3', StressHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:steam_engine')
        .addDefault(Text.translatable('tooltips.kubejs.steam_engine.default.1').gray())
        .addCtrl(RevolutionFlameType)
        .addCtrl(Text.translatable('tooltips.kubejs.steam_engine.ctrl.1', StressHover))
        .addCtrl(Text.translatable('tooltips.kubejs.steam_engine.ctrl.2', StressHover))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:teleport_intestine')
        .addDefault(ItemDirectionTooltip)
        .addAlt(Text.translatable('tooltips.kubejs.teleport_intestine.alt.1'))
        .addAlt(Text.translatable('tooltips.kubejs.teleport_intestine.alt.2'))
        .addAlt(Text.translatable('tooltips.kubejs.teleport_intestine.alt.3'))
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:water_wheel').addDefault(Text.translatable('tooltips.kubejs.water_wheel.default.1').gray())
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:windmill_bearing').addDefault(Text.translatable('tooltips.kubejs.windmill_bearing.default.1').gray())
)

RegistryOrganTooltip(
    new MultiStateTooltip('kubejs:wrench_muscle')
        .addDefault(Text.translatable('tooltips.kubejs.wrench_muscle.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.wrench_muscle.alt.1', WorkOrgansHover, OtherBeltModeHover))
        .addAlt(Text.translatable('tooltips.kubejs.wrench_muscle.alt.2'))
)
