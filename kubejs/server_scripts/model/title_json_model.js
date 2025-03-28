// priority: 2000
function TitleJsonModel(id) {
    this.id = id
    this.defaultDisplay = `titles.kubejs.${id}.defaultDisplay`
    this.variantDisplay = `titles.kubejs.${id}.variantDisplay`
    this.flavorText = `titles.kubejs.${id}.flavorText`
    /** @type {$Rarity} */
    this.rarity = 'common'
    /** @type {$TitleType} */
    this.type = 'advancement'
    this.isPrefix = 'true'
    return this
}
TitleJsonModel.prototype = {
    setDefaultDisplay: function (defaultDisplay) {
        this.defaultDisplay = defaultDisplay
        return this
    },
    setVariantDisplay: function (variantDisplay) {
        this.variantDisplay = variantDisplay
        return this
    },
    setFlavorText: function (flavorText) {
        this.flavorText = flavorText
        return this
    },
    /**
     * 
     * @param {$Rarity} rarity 
     * @returns 
     */
    setRarity: function (rarity) {
        this.rarity = rarity
        return this
    },
    /**
     * 
     * @param {$TitleType} type 
     * @returns 
     */
    setType: function (type) {
        this.type = type
        return this
    },
    setIsPrefix: function (isPrefix) {
        this.isPrefix = isPrefix
        return this
    }
}