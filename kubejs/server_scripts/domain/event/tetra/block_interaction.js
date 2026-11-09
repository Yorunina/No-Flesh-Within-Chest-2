// priority: 500

const TetraBlockBrokenEvent = new TetraEffectEventModel('block_broken')
const TetraExperienceContainerRightClickedEvent = new TetraEffectEventModel('experience_container_right_clicked')

BlockEvents.broken(/** @param {Internal.BlockBrokenEventJS} event */ event => {
    let customData = {}
    TetraBlockBrokenEvent.run(customData, [event])
})

BlockEvents.rightClicked('create_biotech:budding_experience',
    /** @param {Internal.BlockRightClickedEventJS} event */ event => {
        let customData = {}
        TetraExperienceContainerRightClickedEvent.run(customData, [event])
    })
