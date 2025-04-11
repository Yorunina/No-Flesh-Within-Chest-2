// priority: 999
const $Rarity = 'common' || 'uncommon' || 'rare'
const $TitleType = 'advancement' || 'loot' || 'command' || 'starting'
const TitleJsonList = []
/**
 * 
 * @param {TitleJsonModel} titleJsonModel 
 */
function RegisterTitleJson(titleJsonModel) {
    TitleJsonList.push(titleJsonModel)
}

ServerEvents.highPriorityData(event => {
    TitleJsonList.forEach(item => {
        event.addJson(`kubejs:titles/kubejs/${item.id}.json`, {
            defaultDisplay: item.defaultDisplay,
            variantDisplay: item.variantDisplay,
            flavorText: item.flavorText,
            rarity: item.rarity,
            type: item.type,
            isPrefix: item.isPrefix
        })
    })
})

RegisterTitleJson(new TitleJsonModel('beginner').setRarity('uncommon').setType('advancement'))
RegisterTitleJson(new TitleJsonModel('chest_opener'))
RegisterTitleJson(new TitleJsonModel('ender_dancer').setRarity('rare').setType('advancement'))