// priority: 3000
/**
 * @type {string[]}
 */
const OverlayHudOrganScores = []

/**
 * @param {string} id
 */
function RegistryOverlayHudOrganScore(id) {
    OverlayHudOrganScores.push(id)
}

ChestCavityEvents.overlayHud(event => {
    event.setScoreTitle('tooltips.kubejs.overlay.scores')
    event.setTagTitle('tooltips.kubejs.overlay.tags')
    for (let i = 0; i < OverlayHudOrganScores.length; i++) {
        OverlayOrganScore(event, OverlayHudOrganScores[i])
    }
})

/**
 * @param {Internal.OverlayHudJS} event
 * @param {string} id
 */
function OverlayOrganScore(event, id) {
    event.addScore(id, line => {
        const key = `tooltips.organ_score.${id}`
        line.text(
            Text.translate(key)
                .hover([
                    Text.translate(key).gold(),
                    NewLine,
                    Text.translate(`tooltips.organ_score.hover.${id}`)
                ])
                .yellow()
                .underlined()
                .append(Text.of(` ${RoundFix(line.value, 2)}`))
        )
    })
}

/**
 * @param {Internal.MutableComponent} text
 * @param {boolean} active
 * @returns {Internal.MutableComponent}
 */
function overlayGoldIf(text, active) {
    return active ? text.gold() : text.darkGray()
}

/**
 * @param {Internal.OverlayHudJS} event
 * @param {string} id
 * @param {number[]} tiers
 */
function OverlayTagLine(event, id, tiers) {
    event.addTag(id, line => {
        if (tiers.length <= 0) return
        const n = line.count
        const nameKey = `tooltips.kubejs.tag.${id}`
        const hover = [Text.translate(nameKey).gold()]
        for (let i = 0; i < tiers.length; i++) {
            let tier = tiers[i]
            hover.push(overlayGoldIf(
                Text.translate(`tooltips.kubejs.overlay.${id}.${tier}`),
                n >= tier
            ))
        }
        line.text(overlayGoldIf(
            Text.translate(nameKey).append(Text.of(` ${n}/${tiers[tiers.length - 1]}`)),
            n >= tiers[0]
        ))
        line.hover(hover)
    })
}
