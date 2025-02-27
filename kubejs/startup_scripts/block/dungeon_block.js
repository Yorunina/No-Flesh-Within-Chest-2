// priority: 900
StartupEvents.registry('block', event => {
    event.create('locker_block').blockEntity(blockEntityInfo => {
        blockEntityInfo.initialData({
            'SpawnPos': {
                'x': 0,
                'y': 0,
                'z': 0
            }
        })
    })
})