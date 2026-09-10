// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvancedToAll((item, advanced, text) => {
        if (item.hasTag('kubejs:organ') || item.hasTag('kubejs:pseudo_organ')) return

        let profiles = MaterialInsightIndex.findProfiles(item)
        let specialUsages = TetraDataProbe.findSpecialMaterialSchematicKeys(item).size()
        MaterialDossierShortcut.setHoveredProfiles(profiles, item, specialUsages > 0)

        let profileCount = profiles.size()
        if (profileCount <= 0) return

        let lineNum = 1
        let defaultLines = []
        let shiftLines = []
        /**@type {Internal.MaterialProfileSnapshot} */
        let profile = profiles[0]

        let usages = MaterialInsightIndex.usageCount(profile.materialKey())
        defaultLines.push(Text.of('🔎  ').append(Text.translatable('tooltips.kubejs.tetra_material.identity', MaterialInsightText.categoryName(profile), String(usages))).gray())
        defaultLines.push(MaterialInsightText.tendency(profile))
        shiftLines.push(Text.translatable('tooltips.kubejs.tetra_material.axes',
            TetraMaterialStatLabel('primary'),
            TetraMaterialNumber(profile.primary()),
            TetraMaterialStatLabel('secondary'),
            TetraMaterialNumber(profile.secondary()),
            TetraMaterialStatLabel('tertiary'),
            TetraMaterialNumber(profile.tertiary())
        ).gray())
        shiftLines.push(Text.translatable('tooltips.kubejs.tetra_material.capacity',
            TetraMaterialStatLabel('durability'),
            TetraMaterialNumber(profile.durability()),
            TetraMaterialStatLabel('integrity'),
            TetraMaterialNumber(profile.integrityGain()),
            TetraMaterialNumber(profile.integrityCost()),
            TetraMaterialStatLabel('magic_capacity'),
            String(profile.magicCapacity())
        ).gray())
        shiftLines.push(Text.translatable('tooltips.kubejs.tetra_material.intrinsic',
            String(profile.attributeCount()),
            String(profile.effectCount()),
            String(profile.aspectCount()),
            String(profile.featureCount()),
            String(profile.improvementCount())
        ).gray())


        lineNum = AddTextLines(text, defaultLines, lineNum)
        if (tooltip.isShift()) {
            lineNum = AddTextLines(text, [Text.translatable('tooltips.kubejs.tetra_material.shift_holding.1')], lineNum)
            lineNum = AddTextLines(text, shiftLines, lineNum)
        } else {
            lineNum = AddTextLines(text, [Text.translatable('tooltips.kubejs.tetra_material.shift.1')], lineNum)
        }
    })
})

/**
 * @param {number | Internal.Float} value
 * @returns {string}
 */
function TetraMaterialNumber(value) {
    if (value == null) return '-'
    if (!isFinite(value)) return '-'
    return String(RoundFix(value, 2))
}

/**
 * @param {string} statKey
 * @returns {Internal.MutableComponent}
 */
function TetraMaterialStatLabel(statKey) {
    let nameKey = `tooltips.kubejs.tetra_material.stat.${statKey}`
    return Text.translate(nameKey).gray().hover([
        Text.translate(nameKey).gold(),
        NewLine,
        Text.translate(`${nameKey}.description`)
    ])
}
