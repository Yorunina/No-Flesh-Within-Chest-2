// priority: 1000

const ExposureAttachmentStrategy = new StrategyModel()

function RegistryExposureAttachmentStrategy(id, func) {
    ExposureAttachmentStrategy.addStrategy(id, func)
}

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
    let key = GetPosInSturcture(level, hitPos)
    if (!key) return
    let frameData = event.getFrame()
    frameData.putString('aimStructure', key.location().toString())
})

