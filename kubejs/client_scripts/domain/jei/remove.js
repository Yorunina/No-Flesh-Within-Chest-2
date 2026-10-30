// priority: 500
JEIEvents.removeCategories(event => {
    event.remove(['kubejs:eternal_altar', 'kubejs:mantle_energy_extractor', 'kubejs:growth_vat'])
})


JEIEvents.hideItems(event => {
    event.hide('@irons_spellbooks')
})

JEIEvents.hideItems(event => {
    event.hide('kubejs:incomplete_genius')
    event.hide('kubejs:incomplete_flesh_mechanism')
})
