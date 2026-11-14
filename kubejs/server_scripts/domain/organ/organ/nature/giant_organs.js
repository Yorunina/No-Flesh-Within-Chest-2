// priority: 500
const GiantOrganScores = {
    appendix: [['chestcavity:luck', 4]],
    intestine: [['chestcavity:nutrition', 4]],
    heart: [['chestcavity:health', 4]],
    kidney: [['chestcavity:filtration', 4]],
    liver: [['chestcavity:detoxification', 4]],
    lung: [['chestcavity:breath_recovery', 4], ['chestcavity:breath_capacity', 4], ['chestcavity:endurance', 4]],
    muscle: [['chestcavity:strength', 4]],
    rib: [['chestcavity:defense', 4]],
    spine: [['chestcavity:nerves', 4]],
    spleen: [['chestcavity:metabolism', 4]],
    stomach: [['chestcavity:digestion', 4]],
}

Object.entries(GiantOrganScores).forEach(([organ, scores]) => {
    let registration = RegistryOrgan(`kubejs:giant_${organ}`).setRank(0)
    scores.forEach(([score, value]) => registration.addScore(score, value))
})
