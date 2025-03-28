// priority: 999
const OrganScoreGoopRenderStrategy = []

/**
 * 
 * @param {function(Internal.LivingDamageEvent, Internal.ChestCavityInstance, OrganEventCustomData, OrganScoreDamagedGoopModel):void} strategy 
 */
function RegisterOrganScoreGoopRenderStrategy(strategy) {
    OrganScoreGoopRenderStrategy.push(strategy)
}

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function OrganScoreDamagedEffect(event, customData) {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (!entity.isAlive() || !chestCavity) return
    if (!chestCavity.opened) {
        $ChestCavityUtil.openChestCavity(chestCavity)
    }
    let goopModel = new OrganScoreDamagedGoopModel(entity.level, entity.position().add(new Vec3d(0, entity.getBbHeight(), 0)))
    OrganScoreGoopRenderStrategy.forEach(strategy => {
        strategy(event, chestCavity, customData, goopModel)
    })
    if (!goopModel.changed) return
    goopModel.emit()
}

// 健康损伤
RegisterOrganScoreGoopRenderStrategy((event, chestCavity, customData, goopModel) => {
    let score = chestCavity.getOrganScore('chestcavity:health')
    if (score >= 0) return
    goopModel.multiplyColor('#ff5d54')
    let scaleAddition = RoundFix(Math.min(-score / 20, 1), 2)
    if (scaleAddition > 0) goopModel.addScale(scaleAddition)
})

// 呼吸效率损伤
RegisterOrganScoreGoopRenderStrategy((event, chestCavity, customData, goopModel) => {
    let score = chestCavity.getOrganScore('chestcavity:breath_recovery')
    if (score >= 0) return
    goopModel.multiplyColor('#a6b6ff')
})

// 营养效率损伤
RegisterOrganScoreGoopRenderStrategy((event, chestCavity, customData, goopModel) => {
    let score = chestCavity.getOrganScore('chestcavity:nutrition')
    if (score >= 0) return
    goopModel.multiplyColor('#ffeba3')
})