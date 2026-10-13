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
    event.setScoreTitle(
        Text.translatable('tooltips.kubejs.overlay.scores')
            .font('kubejs:fusion_pixel')
    )
    event.setTagTitle(
        Text.translatable('tooltips.kubejs.overlay.tags')
            .font('kubejs:fusion_pixel')
    )
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
            Text.translatable(key)
                .append(Text.of(` ${RoundFix(line.value, 2)}`))
                .font('kubejs:fusion_pixel')
        )
            .hover([
                Text.translatable(key).gold(),
                Text.translatable(`tooltips.organ_score.hover.${id}`)
            ])
    })
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
        const hover = [Text.translatable(nameKey).gold()]
        for (let i = 0; i < tiers.length; i++) {
            let tier = tiers[i]
            hover.push(
                Text.translatable(`tooltips.kubejs.overlay.${id}.${tier}`)
                    .color(n >= tier ? 'gold' : 'dark_gray')
            )
        }
        line.text(
            Text.translatable(nameKey).append(Text.of(` ${n}/${tiers[tiers.length - 1]}`))
                .font('kubejs:fusion_pixel')
                .color(n >= tiers[0] ? 'gold' : 'dark_gray')
        )

        line.hover(hover)
    })
}
