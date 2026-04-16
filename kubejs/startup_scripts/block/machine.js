// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:world_computer', 'custommachinery')
        .machine('kubejs:world_computer')

    event.create('kubejs:eternal_altar', 'custommachinery')
        .machine('kubejs:eternal_altar')
        .renderType('translucent')

    event.create('kubejs:mantle_energy_extractor', 'custommachinery')
        .machine('kubejs:mantle_energy_extractor')
        .renderType('translucent')

    event.create('kubejs:growth_vat', 'custommachinery')
        .machine('kubejs:growth_vat')
        .renderType('translucent')// 培养仓的透明面渲染存在异常，此处尝试修复，但仍可能存在问题
    // 此外，培养仓工作状态下的模型与贴图不匹配，需要重新导出模型
})