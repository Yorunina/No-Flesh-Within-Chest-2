// priority: 500
/**
 * 根据目视获取结构，并且记录结构信息到相纸上
 * 之所以不使用Exposure自身所包含的Structures原因为：列表不容易被FTBQ检测
 * 采用aimStructure可以通过NBT Weak Filter来进行匹配
 */
ExposureEvents.modifyFrameData(event => {
    const level = event.level
    const player = event.player
    const cameraStack = event.cameraStack
    let customData = {}

    let attachmentList = ExposureGetAttachmentIds(cameraStack)
    if (attachmentList.length > 0) {
        ExposureAttachmentStrategy.run(attachmentList, [event], customData)
    }

    let ray = player.rayTrace(32)
    if (!ray.hit) return
    let hitPos = ConvertVec3d2BlockPos(ray.hit)
    let key = IsInAnySturcture(level, hitPos)
    if (!key) return
    let frameData = event.getFrame()
    frameData.putString('aimStructure', key.location().toString())
})

const ExposureAttachmentStrategy = new StrategyModel()

function RegisterExposureAttachmentStrategy(id, func) {
    ExposureAttachmentStrategy.addStrategy(id, func)
}


RegisterExposureAttachmentStrategy('kubejs:exorcism_lens', ExorcismLensStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function ExorcismLensStrategy(customData, event) {
    const player = event.player
    const cameraStack = event.cameraStack
    const entityList = event.getEntitiesInFrame()
    entityList.forEach(pEntity => {
        pEntity.attack(player.damageSources().magic(), 5)
    })
}

RegisterExposureAttachmentStrategy('exposure:dream_film', DreamFilmStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function DreamFilmStrategy(customData, event) {
    const cameraStack = event.cameraStack
    let cameraNbt = cameraStack.getNbt()
    if (!cameraNbt.contains('Film')) return
    let filmItemNbt = cameraNbt.getCompound('Film')
    if (!filmItemNbt.contains('tag')) {
        filmItemNbt.put('tag', new $CompoundTag())
    }
    let nbt = filmItemNbt.getCompound('tag')
    if (!nbt.contains('Frames')) {
        nbt.put('Frames', new $ListTag())
    }
    let frameList = nbt.getList('Frames', GET_COMPOUND_TYPE)
    frameList.add(new $CompoundTag())
}
