// priority: 1000
StartupEvents.registry('custom_stat', event => {
    global.STAT_TETRA_CRAFT = event.create('tetra_craft').id
    global.STAT_TETRA_CRAFT_GENESIS = event.create('tetra_craft_genesis').id
    global.STAT_GROWTH_VAT_RUNS = event.create('growth_vat_runs').id
})
