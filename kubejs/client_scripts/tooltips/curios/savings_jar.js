// priority: 500
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:rank_savings_jar')
    .addDefault(Text.translatable('tooltips.kubejs.rank_savings_jar.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.rank_savings_jar.shift.1'))
    .addShift(Text.translatable('tooltips.kubejs.rank_savings_jar.shift.2'))
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:health_savings_jar')
    .addDefault(Text.translatable('tooltips.kubejs.health_savings_jar.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.health_savings_jar.shift.1'))
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:armor_savings_jar')
    .addDefault(Text.translatable('tooltips.kubejs.armor_savings_jar.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.armor_savings_jar.shift.1'))
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:attack_savings_jar')
    .addDefault(Text.translatable('tooltips.kubejs.attack_savings_jar.default.1').gray())
    .addShift(Text.translatable('tooltips.kubejs.attack_savings_jar.shift.1'))
)

ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:mutated_savings_jar')
    .addDefault(Text.translatable('tooltips.kubejs.mutated_savings_jar.default.1').gray())
    .addShift((text, item) => FormatMutatedSavingsJarTooltip(item))
)

/**
 * @param {Internal.ItemStack} item
 * @returns {Internal.MutableComponent[]}
 */
function FormatMutatedSavingsJarTooltip(item) {
    let empty = [Text.translatable('tooltips.kubejs.mutated_savings_jar.shift.empty')]
    if (!item.hasNBT() || !item.nbt.contains('savings_jar')) return empty
    let terms = item.nbt.getCompound('savings_jar').getList('terms', 10)
    let parts = []
    for (let i = 0; i < terms.size(); i++) {
        let piece = FormatMutatedSavingsJarTerm(terms.getCompound(i))
        if (piece) parts.push(piece)
    }
    if (parts.length == 0) return empty
    return [Text.translatable('tooltips.kubejs.mutated_savings_jar.shift.1', parts.join(' + '))]
}

/**
 * @param {Internal.CompoundTag} term
 * @returns {string}
 */
function FormatMutatedSavingsJarTerm(term) {
    let stat = Text.translatable('tooltips.kubejs.savings_jar.stat.' + term.getString('stat')).getString()
    let chunks = []
    let rand = term.getFloat('rand')
    let constant = term.getFloat('constant')
    if (rand > 0) chunks.push('random() x ' + FormatSavingsJarCoef(rand) + ' x ' + FormatSavingsJarStatExpr(stat, term.getFloat('randPower'), term.getBoolean('toughness')))
    if (constant > 0) chunks.push(FormatSavingsJarCoef(constant) + ' x ' + FormatSavingsJarStatExpr(stat, term.getBoolean('rankFloor') ? 1 : term.getFloat('constPower'), false))
    return chunks.join(' + ')
}

/**
 * @param {string} stat
 * @param {number} power
 * @param {boolean} toughness
 * @returns {string}
 */
function FormatSavingsJarStatExpr(stat, power, toughness) {
    let expr = (Math.abs(power - 1) < 0.001) ? stat : (stat + '^' + FormatSavingsJarCoef(power))
    if (toughness) expr = expr + ' x (1+' + Text.translatable('tooltips.kubejs.savings_jar.stat.toughness').getString() + '/4)'
    return expr
}

/**
 * @param {number} value
 * @returns {string}
 */
function FormatSavingsJarCoef(value) {
    return value.toFixed(4).replace(/\.?0+$/, '')
}
