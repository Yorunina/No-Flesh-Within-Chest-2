// priority: 501
const GatewayChaosModifierMapping = new PiecewiseMappingModel()
    .addPiece(10, 20, (levelIndicator, chaosIndicator) => {
        let modifierList = []
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 120, 'minecraft:fire_resistance', 0, 3, 1, false, false))
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'minecraft:resistance', 0, 1, 1, false, false))
        return modifierList
    })
    .addPiece(20, 30, (levelIndicator, chaosIndicator) => {
        let modifierList = []
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 60, 'minecraft:invisibility', 0, true, true))
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'minecraft:resistance', 0, 2, 1, false, false))
        return modifierList
    })
    .addPiece(30, 40, (levelIndicator, chaosIndicator) => {
        let modifierList = []
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 300, 'minecraft:invisibility', 0, true, true))
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 120, 'minecraft:resistance', 0, 2, 1, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 60, 'brewery:toxictouch', 0, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 60, 'brewery:partystarter', 0, false, false))
        return modifierList
    })
    .addPiece(40, 50, (levelIndicator, chaosIndicator) => {
        let modifierList = []
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'minecraft:resistance', 0, 3, 1, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 120, 'brewery:toxictouch', 0, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 120, 'brewery:partystarter', 0, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 60, 'farm_and_charm:farmers_blessing', 0, false, false))
        return modifierList
    })
    .addPiece(50, 61, (levelIndicator, chaosIndicator) => {
        let modifierList = []
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'irons_spellbooks:oakskin', 0, 9, 1, false, false))
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'irons_spellbooks:evasion', 0, 4, 1, false, false))
        modifierList.push(GatewayUtils.buildStepEffectModifier(chaosIndicator / 60, 'minecraft:resistance', 0, 3, 1, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 120, 'brewery:toxictouch', 0, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 120, 'brewery:partystarter', 0, false, false))
        modifierList.push(GatewayUtils.buildEffectModifier(chaosIndicator / 300, 'minecraft:invisibility', 0, true, true))
        return modifierList
    })