// priority: 1000
var DREAM_SPELL_POWER, DREAM_SPELL_RESISTANCE

StartupEvents.registry('attribute', event => {
    DREAM_SPELL_POWER = event.create('dream_spell_power', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)
    DREAM_SPELL_RESISTANCE = event.create('dream_spell_resistance', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)
})


ForgeModEvents.onEvent('net.minecraftforge.event.entity.EntityAttributeModificationEvent', event => {
    event.types.forEach(type => {
        event.add(type, DREAM_SPELL_POWER.get())
        event.add(type, DREAM_SPELL_RESISTANCE.get())
    })
})