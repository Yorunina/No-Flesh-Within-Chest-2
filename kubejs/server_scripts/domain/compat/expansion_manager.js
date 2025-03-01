// priority: 500
/** @type {Map<string, ExpansionInfoModel>} */
const ExpansionInfoMap = new Map()
function ExpansionInfoModel(id) {
    this.id = id
    this.displayName = ''
    this.description = ''
    this.compatibleList = []
    this.author = 'Unknown'
    this.version = '0.0.0'
    return this
}

ExpansionInfoModel.prototype = {
    setDisplayName: function (displayName) {
        this.displayName = displayName
        return this
    },
    setDescription: function (description) {
        this.description = description
        return this
    },
    setCompatibleList: function (compatibleList) {
        this.compatibleList = compatibleList
        return this
    },
    setAuthor: function (author) {
        this.author = author
        return this
    },
    setVersion: function (version) {
        this.version = version
        return this
    },

    readFromJson: function (json) {
        if (!json) return this
        if (json.displayName) this.setDisplayName(json.displayName)
        if (json.description) this.setDescription(json.description)
        if (json.compatibleList) this.setCompatibleList(json.compatibleList)
        if (json.author) this.setAuthor(json.author)
        if (json.version) this.setVersion(json.version)
        return this
    }
}


ServerEvents.highPriorityData(event => {
    if (FilesJS.exists('kubejs/expansion_info')) {
        ExpansionInfoMap.clear()
        FilesJS.listFiles('kubejs/expansion_info').forEach(file => {
            // todo filejs存在安全问题
            console.log(file)
            let expansionInfoJsonObj = JsonIO.parse(FilesJS.readFile('kubejs/expansion_info/' + file))
            console.log(expansionInfoJsonObj)
            if (!expansionInfoJsonObj || !expansionInfoJsonObj.id) return
            let expansionInfo = new ExpansionInfoModel(expansionInfoJsonObj.id)
            expansionInfo.readFromJson(expansionInfoJsonObj)
            ExpansionInfoMap.set(expansionInfo.id, expansionInfo)
        })
    }
})



PlayerEvents.loggedIn(event => {
    const player = event.player
    if (ExpansionInfoMap.size > 0) {
        player.tell(Text.translatable('msg.kubejs.expansion_content.load_expansion.1').append(Text.translatable('msg.kubejs.expansion_content.load_expansion.2', ExpansionInfoMap.size).clickRunCommand('/nfwc expansion list')))
        return
    }
})

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
        Commands.literal('nfwc')
            .then(Commands.literal('expansion')
                .then(Commands.literal('list')
                   .executes(ctx => {
                        ExpansionInfoMap.forEach(expansionInfo => {
                            ctx.source.tell(
                                Text.translatable('msg.kubejs.expansion_content.list.1')
                                .append(Text.translatable(expansionInfo.displayName).gold())
                                .hover(
                                    Text.translatable('msg.kubejs.expansion_content.list.2', Text.of(expansionInfo.id).gold(), Text.of(expansionInfo.version).gold(), Text.of(expansionInfo.author).gold(), Text.translatable(expansionInfo.description))
                                ))
                        })
                        return 1
                    }
                    ))
            )
    )
})