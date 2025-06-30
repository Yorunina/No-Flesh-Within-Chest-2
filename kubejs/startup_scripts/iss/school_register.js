// priority: 500
StartupEvents.registry('irons_spellbooks:schools', event => {
    event.create('dream')
        .setName(Text.of('school.kubejs.dream').color('#1aefef'))
        .setFocus('kubejs:dream_focus')
        .setPowerAttribute('kubejs:dream_spell_power')
        .setResistanceAttribute('kubejs:dream_spell_resistance')
        .setDefaultCastSound('irons_spellbooks:cast.generic.holy')
})