// priority: 500
/**
 * 用于管理扩展包
 */
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
    /**
     * 
     * @param {Internal.JsonObject} json 
     * @returns 
     */
    readFromJson: function (json) {
        if (!json) return this
        if (json.has('displayName')) this.setDisplayName(json.get('displayName').getAsString())
        if (json.has('description')) this.setDescription(json.get('description').getAsString())
        if (json.has('compatibleList')) this.setCompatibleList(json.get('compatibleList').getAsJsonArray().asList())
        if (json.has('author')) this.setAuthor(json.get('author').getAsString())
        if (json.has('version')) this.setVersion(json.get('version').getAsString())
        return this
    }
}


ServerEvents.highPriorityData(event => {
    if (FilesJS.exists('kubejs/expansion_info')) {
        ExpansionInfoMap.clear()
        FilesJS.listFiles('kubejs/expansion_info').forEach(file => {
            let expansionInfoJsonObj = JsonIO.parseRaw(FilesJS.readFile(file)).getAsJsonObject()
            if (!expansionInfoJsonObj || !expansionInfoJsonObj.has('id')) return
            let expansionInfo = new ExpansionInfoModel(expansionInfoJsonObj.get('id').getAsString())
            expansionInfo.readFromJson(expansionInfoJsonObj)
            ExpansionInfoMap.set(expansionInfo.id, expansionInfo)
        })
    }
})


PlayerEvents.loggedIn(event => {
    const player = event.player
    if (ExpansionInfoMap.size > 0) {
        player.tell(
            Text.translatable('msg.kubejs.expansion_content.load_expansion.1', Text.of(ExpansionInfoMap.size.toFixed(0)))
            .append(Text.translatable('msg.kubejs.expansion_content.load_expansion.2').gold().underlined().clickRunCommand('/nfwc expansion list')))
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
                            ctx.source.player.tell(
                                Text.translatable('msg.kubejs.expansion_content.list.1')
                                .append(Text.translatable(expansionInfo.displayName).gold())
                                .hover(
                                    Text.translatable('msg.kubejs.expansion_content.list.2', 
                                        Text.of(expansionInfo.id).gold(), 
                                        Text.of(expansionInfo.version).gold(), 
                                        Text.of(expansionInfo.author).gold(), 
                                        Text.translatable(expansionInfo.description))
                                ))
                        })
                        return 1
                    }
                    ))
            )
    )
})