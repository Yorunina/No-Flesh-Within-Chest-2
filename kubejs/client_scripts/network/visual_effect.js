// priority: 500
NetworkEvents.dataReceived('apply_visual_effect', event => {
    VisualJS.applyEffect('creeper', true)
})


ClientEvents.loggedOut(event => {
    VisualJS.clearEffect()
})