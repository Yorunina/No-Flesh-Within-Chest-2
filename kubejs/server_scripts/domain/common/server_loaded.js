// priority: 500
ServerEvents.loaded(event => {
    const server = event.getServer()
    $EternalWinterUtil.setEternalWinterEnabled(server.persistentData.getBoolean('isEternalWinter'))
})