// priority: 500
NetworkEvents.dataReceived('screen_shake', event => {
    const data = event.data
    const duration = data.getInt('duration')
    const intensityX = data.getFloat('intensityX')
    const intensityY = data.getFloat('intensityY')
    const intensityZ = data.getFloat('intensityZ')
    $ScreenshakeHandler.addScreenshake(
        new $ScreenshakeInstance(duration)
            .setIntensity(intensityX, intensityY, intensityZ)
            .setEasing($Easing.SINE_IN, $Easing.QUAD_IN)
    )
})