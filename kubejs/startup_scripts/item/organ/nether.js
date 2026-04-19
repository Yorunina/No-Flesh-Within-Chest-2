// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:ignited_armour').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nether/ignited_armour').tag('kubejs:nether').tag('kubejs:liver')

    event.create('kubejs:embers_liver').maxStackSize(1).texture('kubejs:item/organs/nether/embers_liver').tag('kubejs:nether').tag('kubejs:liver')

    event.create('kubejs:blaze_spine').maxStackSize(1).texture('kubejs:item/organs/nether/blaze_spine').tag('kubejs:nether').tag('kubejs:spine')

    event.create('kubejs:explosion_cavity').maxStackSize(1).texture('kubejs:item/organs/nether/explosion_cavity').tag('kubejs:nether').tag('kubejs:lung')

    event.create('kubejs:ghast_sac').maxStackSize(1).texture('kubejs:item/organs/nether/ghast_sac').tag('kubejs:nether').tag('kubejs:lung')

    event.create('kubejs:hoglin_rumen').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nether/hoglin_rumen').tag('kubejs:stomach')

    event.create('kubejs:golden_stone').maxStackSize(1).texture('kubejs:item/organs/nether/golden_stone').tag('kubejs:nether')

    event.create('kubejs:fireproof_appendix').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_appendix').tag('kubejs:appendix')
    event.create('kubejs:fireproof_intestine').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_intestine').tag('kubejs:intestine')
    event.create('kubejs:fireproof_heart').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_heart').tag('kubejs:heart')
    event.create('kubejs:fireproof_kidney').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_kidney').tag('kubejs:kidney')
    event.create('kubejs:fireproof_liver').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_liver').tag('kubejs:liver')
    event.create('kubejs:fireproof_lung').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_lung').tag('kubejs:lung')
    event.create('kubejs:fireproof_muscle').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_muscle').tag('kubejs:muscle')
    event.create('kubejs:fireproof_rib').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_rib').tag('kubejs:bone')
    event.create('kubejs:fireproof_spine').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_spine').tag('kubejs:spine')
    event.create('kubejs:fireproof_spleen').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_spleen').tag('kubejs:spleen')
    event.create('kubejs:fireproof_stomach').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_stomach').tag('kubejs:stomach')
})