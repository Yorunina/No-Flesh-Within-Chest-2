// priority: 999
const OrganExposureFrameAdded = new OrganEventModel('exposure_frame_added')

NativeEvents.onEvent($FrameAddedEvent, /** @param {Internal.FrameAddedEvent} event */ event => {
    const cameraHolderEntity = event.cameraHolderEntity
    if (!cameraHolderEntity) return
    let customData = {}
    OrganExposureFrameAdded.run(cameraHolderEntity, customData, [event])
})