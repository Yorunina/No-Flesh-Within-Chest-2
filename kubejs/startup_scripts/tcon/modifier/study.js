// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('study', builder => {
        builder.getToolDamage((toolView, lvl, amount, entity) => {
            let maxDamage = toolView.getStats().getInt($ToolStats.DURABILITY)
            if (maxDamage - toolView.getDamage() <= amount) {
                let toolItem = SimpleTCon.castToolStack(toolView)
                let reinforcedId = SimpleTCon.getModifierId('tconstruct:reinforced')
                let studyId = SimpleTCon.getModifierId('kubejs:study')
                let reinforcedLevel = toolItem.getModifierLevel(reinforcedId)
                if (reinforcedLevel < 5) {
                    toolItem.addModifier(reinforcedId, 1)
                    if (maxDamage >= 20000) {
                        toolItem.addModifier(studyId, 1)
                    }
                    toolItem.setDamage(0)
                    amount = 0
                } else if (reinforcedLevel == 5) {
                    toolItem.addModifier(SimpleTCon.getModifierId('tconstruct:unbreakable'), 1)
                    let studyLevel = toolItem.getModifierLevel(studyId)
                    if (maxDamage >= 20000 && studyLevel >= 6 && entity.isPlayer()) {
                        toolItem.removeModifier(studyId, studyLevel)
                        entity.give('kubejs:genesis_tinker_blueprint')
                    }
                    toolItem.setDamage(0)
                    amount = 0
                }
            }
            return amount
        })
    })
})