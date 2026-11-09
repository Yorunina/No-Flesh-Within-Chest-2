// priority: 500

const TetraCurioChangeEvent = new TetraEffectEventModel('curio_change')

NativeEvents.onEvent($EventPriority.NORMAL, false, $CurioChangeEvent,
    /** @param {Internal.CurioChangeEvent} event */ event => {
        let customData = {}
        TetraCurioChangeEvent.run(customData, [event])
    })
