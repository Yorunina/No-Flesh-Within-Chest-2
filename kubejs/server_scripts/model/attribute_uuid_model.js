// priority: 2000
function AttributeUUIDModel(attributeKey) {
    this.attributeKey = attributeKey
    /**@type {Internal.UUID} */
    this.baseAdd = null
    /**@type {Internal.UUID} */
    this.baseMulti = null
    /**@type {Internal.UUID} */
    this.allMulti = null
    return this
}

AttributeUUIDModel.prototype = {
    setBaseAddUUID: function(uuidString) {
        this.baseAdd = UUID.fromString(uuidString)
        return this
    },
    setBaseMultiUUID: function(uuidString) {
        this.baseMulti = UUID.fromString(uuidString)
        return this
    },
    setAllMultiUUID: function(uuidString) {
        this.allMulti = UUID.fromString(uuidString)
        return this
    },
}
