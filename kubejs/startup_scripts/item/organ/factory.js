// priority: 500
const fanCatalysts = [
    'create_connected:fan_blasting_catalyst',
    'create_connected:fan_smoking_catalyst',
    'create_connected:fan_splashing_catalyst',
    'create_connected:fan_haunting_catalyst'
]

StartupEvents.registry('item', event => {
    // 生物工厂器官；保留原有标签和交互。
    event.create('kubejs:basin')
        .overrideOtherStackedOnMe(BundleStackedOnMe(128))
        .overrideStackedOnOther(BundleStackedOnOther(128))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .parentModel('kubejs:item/basin_model')
        .tag('kubejs:factory')

    event.create('kubejs:belt_connecter').texture('kubejs:item/organs/factory/belt_connecter').maxStackSize(1).tag('kubejs:factory')

    event.create('kubejs:brass_funnel')
        .parentModel('kubejs:item/brass_funnel_model')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1))
        .overrideStackedOnOther(BundleStackedOnOther(1))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .canFitInsideContainerItems(false)
        .tooltipImage(BundleTooltip)

    event.create('kubejs:crushing_wheel')
        .overrideOtherStackedOnMe(BundleStackedOnMe(64))
        .overrideStackedOnOther(BundleStackedOnOther(64))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .maxDamage(100)
        .tag('kubejs:factory')
        .texture('kubejs:item/organs/factory/crushing_wheel')

    event.create('kubejs:deployer')
        .overrideOtherStackedOnMe(BundleStackedOnMe(64))
        .overrideStackedOnOther(BundleStackedOnOther(64))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .maxDamage(100)
        .tag('kubejs:factory')
        .texture('kubejs:item/organs/factory/deployer')

    event.create('kubejs:encased_fan')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1, item => fanCatalysts.includes(item.getId())))
        .overrideStackedOnOther(BundleStackedOnOther(1, item => fanCatalysts.includes(item.getId())))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .maxDamage(100)
        .tag('kubejs:factory')
        .tag('kubejs:machine')
        .tag('kubejs:magic')
        .tag('kubejs:food')
        .texture('kubejs:item/organs/factory/encased_fan')

    event.create('kubejs:factory_heart')
        .parentModel('kubejs:item/factory_heart_model')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .tag('kubejs:heart')

    event.create('kubejs:genius')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1, item => !$PotionUtils.getPotion(item).effects.isEmpty(), true))
        .overrideStackedOnOther(BundleStackedOnOther(1, item => !$PotionUtils.getPotion(item).effects.isEmpty(), true))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/factory/genius')
        .maxStackSize(1)
        .tag('kubejs:factory')

    event.create('kubejs:item_drain')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1, item => item.getId() == 'createdieselgenerators:canister'))
        .overrideStackedOnOther(BundleStackedOnOther(1, item => item.getId() == 'createdieselgenerators:canister'))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .maxDamage(100)
        .tag('kubejs:factory')
        .texture('kubejs:item/organs/factory/item_drain')

    event.create('kubejs:magnetic_stomach')
        .texture('kubejs:item/organs/factory/magnetic_stomach')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .tag('kubejs:stomach')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1))
        .overrideStackedOnOther(BundleStackedOnOther(1))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .canFitInsideContainerItems(false)
        .tooltipImage(BundleTooltip)

    event.create('kubejs:mechanical_drill').texture('kubejs:item/organs/factory/mechanical_drill').maxStackSize(1).tag('kubejs:factory')

    event.create('kubejs:mechanical_mixer').texture('kubejs:item/organs/factory/mechanical_mixer').maxStackSize(1).maxDamage(100).tag('kubejs:factory')

    event.create('kubejs:mechanical_press').texture('kubejs:item/organs/factory/mechanical_press').maxStackSize(1).tag('kubejs:factory').maxDamage(100)

    event.create('kubejs:mechanical_saw').texture('kubejs:item/organs/factory/mechanical_saw').maxStackSize(1).tag('kubejs:factory').maxDamage(100)

    event.create('kubejs:mechanized_belt').texture('kubejs:item/organs/factory/mechanized_belt').maxStackSize(1).tag('kubejs:factory').tag('kubejs:machine').tag('kubejs:revolution')

    event.create('kubejs:output_brass_funnel')
        .parentModel('kubejs:item/output_brass_funnel_model')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1))
        .overrideStackedOnOther(BundleStackedOnOther(1))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .canFitInsideContainerItems(false)
        .tooltipImage(BundleTooltip)

    event.create('kubejs:purgatory').texture('kubejs:item/organs/factory/purgatory').maxStackSize(1).tag('kubejs:factory').tag('kubejs:machine').maxDamage(100)

    event.create('kubejs:recovery_spleen').texture('kubejs:item/organs/factory/recovery_spleen').maxStackSize(1).tag('kubejs:factory').tag('kubejs:spleen')

    event.create('kubejs:smart_chute')
        .parentModel('kubejs:item/smart_chute_model')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1))
        .overrideStackedOnOther(BundleStackedOnOther(1))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .canFitInsideContainerItems(false)
        .tooltipImage(BundleTooltip)

    event.create('kubejs:spout')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1, item => item.getId() == 'createdieselgenerators:canister'))
        .overrideStackedOnOther(BundleStackedOnOther(1, item => item.getId() == 'createdieselgenerators:canister'))
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .maxStackSize(1)
        .maxDamage(100)
        .tag('kubejs:factory')
        .texture('kubejs:item/organs/factory/spout')

    event.create('kubejs:steam_engine')
        .parentModel('kubejs:item/steam_engine_model')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .tag('kubejs:machine')

    event.create('kubejs:teleport_intestine')
        .texture('kubejs:item/organs/factory/teleport_intestine')
        .maxStackSize(1)
        .tag('kubejs:factory')
        .tag('kubejs:intestine')
        .overrideOtherStackedOnMe(BundleStackedOnMe(1))
        .overrideStackedOnOther(BundleStackedOnOther(1))
        .barWidth(BundleBarWidth)
        .barColor(() => Color.DARK_BLUE)
        .canFitInsideContainerItems(false)
        .tooltipImage(BundleTooltip)

    event.create('kubejs:water_wheel').texture('kubejs:item/organs/factory/water_wheel').maxStackSize(1).tag('kubejs:factory')

    event.create('kubejs:windmill_bearing').texture('kubejs:item/organs/factory/windmill_bearing').maxStackSize(1).tag('kubejs:factory')

    event.create('kubejs:wrench_muscle').texture('kubejs:item/organs/factory/wrench_muscle').maxStackSize(1).tag('kubejs:factory').tag('kubejs:muscle')
})
