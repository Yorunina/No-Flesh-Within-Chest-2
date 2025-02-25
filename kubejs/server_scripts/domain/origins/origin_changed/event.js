// priority: 800
OriginsEvents.originChanged(event => {
    const origin = event.getOrigin()
    if (origin.getPath() == 'empty') return
    console.log(origin.getPath())
    console.log(event.getOriginLayer())
    let key = `${origin.getNamespace()}:${origin.getPath()}`
    let customData = {}
    OriginChangedStrategy.run([key], [event], customData)
})



const OriginChangedStrategy = new StrategyModel()

function RegisterOriginChangedStrategy(id, func) {
    OriginChangedStrategy.addStrategy(id, func)
}