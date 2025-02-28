// priority: 900
StartupEvents.registry('block', event => {
    event.create('locker_block').blockEntity(blockEntityInfo => {})
})