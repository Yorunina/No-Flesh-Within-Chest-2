// priority: 1000

const ExposureAttachmentStrategy = new StrategyModel()

function RegistryExposureAttachmentStrategy(id, func) {
    ExposureAttachmentStrategy.addStrategy(id, func)
}

ExposureEvents.modifyFrameData(event => {
    const cameraStack = event.cameraStack
    let customData = {}
    if (!(cameraStack.getItem() instanceof $CameraItem)) return
    let attachmentIdList = ExposureGetAttachmentIds(cameraStack)
    if (attachmentIdList.length > 0) {
        ExposureAttachmentStrategy.run(attachmentIdList, [event], customData)
    }
})

