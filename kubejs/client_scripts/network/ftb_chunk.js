// priority: 500
NetworkEvents.dataReceived('ftb_chunk_waypoint', event => {
    const data = event.data
    CreateWaypoint(new BlockPos(data.getInt('x'), data.getInt('y'), data.getInt('z')), data.getString('name'), data.getInt('color'))
})

