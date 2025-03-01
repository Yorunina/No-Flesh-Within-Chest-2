// priority: 500
PlayerEvents.loggedIn(event => {
    let player = event.player
    let flag = false
    for (let i in global.expansionContents) {
        if (!flag) {
            flag = true
            player.tell($Serializer.fromJsonLenient(`{"translate":"msg.kubejs.expansion_content.has_expansion_content"}`))
        }
        player.tell($Serializer.fromJsonLenient(`[{"text":" - "},${getExpansionContentInfoJson(i)}]`))
    }
})