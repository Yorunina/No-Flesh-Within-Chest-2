// priority: 500
ChestCavityEvents.overlayHud(event => {
    event.setScoreTitle('tooltips.kubejs.overlay.scores')
    event.setTagTitle('tooltips.kubejs.overlay.tags')

    overlayOrganScore(event, 'chestcavity:health')
    overlayOrganScore(event, 'chestcavity:strength')
    overlayOrganScore(event, 'kubejs:dragon_blood')

    overlayTagLine(event, 'kubejs:heart', [
        { min: 3, key: 'tooltips.kubejs.overlay.heart.3' },
        { min: 6, key: 'tooltips.kubejs.overlay.heart.6' },
        { min: 9, key: 'tooltips.kubejs.overlay.heart.9' }
    ])
    overlayTagLine(event, 'kubejs:dragon', [
        { min: 3, key: 'tooltips.kubejs.overlay.example.dragon.3' },
        { min: 6, key: 'tooltips.kubejs.overlay.example.dragon.6' }
    ])
    overlayTagLine(event, 'kubejs:infected', [
        { min: 2, key: 'tooltips.kubejs.overlay.example.infected.2' }
    ])
})

function overlayOrganScore(event, id) {
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

function overlayGoldIf(text, active) {
    return active ? text.gold() : text.color('#a3a3a3')
}

function overlayTagLine(event, id, tiers) {
    event.addTag(id, line => {
        const n = line.count
        const nameKey = `tooltips.kubejs.tag.${id}`
        const hover = [Text.translate(nameKey).gold()]
        for (let i = 0; i < tiers.length; i++) {
            let tier = tiers[i]
            hover.push(overlayGoldIf(Text.translate(tier.key), n >= tier.min))
        }
        line.text(overlayGoldIf(
            Text.translate(nameKey).append(Text.of(` ${n}/${tiers[tiers.length - 1].min}`)),
            n >= tiers[0].min
        ))
        line.hover(hover)
    })
}
