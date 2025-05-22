// priority: 2000
/**
 * 属性管理模型，用于解决自定义结构的乘算加算等数值问题
 * @param {number} attr
 */
function AttributeManagerModel(attr) {
    this.attr = attr
    this.baseAddModifier = 0
    this.baseMultiModifier = 0
    this.allAddModifier = 0
    this.allMultiModifier = 0
    this.isModified = false
}

AttributeManagerModel.prototype = {
    /**
     * 设置新的基础值，这用于某些后验属性值的置入
     * @param {number} attr
     * @returns {AttributeManagerModel}
     */
    setBaseAttr: function (attr) {
        this.attr = attr
        return this
    },
    /**
     * 计算结果
     * @returns {number}
     */
    calResult: function () {
        return (this.attr * (1 + this.baseMultiModifier) + this.baseAddModifier) * (1 + this.allMultiModifier) + this.allAddModifier
    },
    /**
     * 
     * @param {Number} num 
     * @param {'addition'|'multiple'} modifierType 
     * @param {'base'|'all'} baseType 
     * @returns {AttributeManagerModel}
     */
    addAttributeModifier: function (num, modifierType, baseType) {
        this.isModified = true
        if (baseType == 'base') {
            if (modifierType == 'addition') {
                this.baseAddModifier = this.baseAddModifier + num
            } else if (modifierType == 'multiple') {
                this.baseMultiModifier = this.baseMultiModifier + num
            }
        } else if (baseType == 'all') {
            if (modifierType == 'addition') {
                // 这应当是一个本不存在的状态
                this.allAddModifier = this.allAddModifier + num
            } else if (modifierType == 'multiple') {
                this.allMultiModifier = this.allMultiModifier + num
            }
        }
        return this
    },
    /**
     * @param {Internal.LivingEntity} entity 
     * @param {Internal.Attribute_} attributeKey
     * @param {string} identifier
     * @returns {AttributeManagerModel}
     */
    applyOnEntityByAttributeKey: function (entity, attributeKey, identifier) {
        if (!AttributeIdentifierMap[attributeKey]) return
        let attributeUUIDModel = AttributeIdentifierMap[attributeKey]
        let attributeInstance = entity.getAttribute(attributeKey)
        if (!attributeInstance) return
        attributeInstance.modifiers.forEach(modifier => {
            if (modifier.operation.equals($Operation.ADDITION) && modifier.id.equals(attributeUUIDModel.baseAdd)) {
                attributeInstance.removeModifier(attributeUUIDModel.baseAdd)
            } else if (modifier.operation.equals($Operation.MULTIPLY_BASE) && modifier.id.equals(attributeUUIDModel.baseMulti)) {
                attributeInstance.removeModifier(attributeUUIDModel.baseMulti)
            } else if (modifier.operation.equals($Operation.MULTIPLY_TOTAL) && modifier.id.equals(attributeUUIDModel.allMulti)) {
                attributeInstance.removeModifier(attributeUUIDModel.allMulti)
            }
        })

        if (!this.isModified) return

        if (this.baseAddModifier != 0) {
            let attributeModifier = new $AttributeModifier(attributeUUIDModel.baseAdd, identifier + 'BaseAddition', this.baseAddModifier, $Operation.ADDITION)
            attributeInstance.addPermanentModifier(attributeModifier)
        }
        if (this.baseMultiModifier != 1) {
            let attributeModifier = new $AttributeModifier(attributeUUIDModel.baseMulti, identifier + 'BaseMulti', this.baseMultiModifier, $Operation.MULTIPLY_BASE)
            attributeInstance.addPermanentModifier(attributeModifier)
        }
        if (this.allMultiModifier != 0) {
            let attributeModifier = new $AttributeModifier(attributeUUIDModel.allMulti, identifier + 'AllMulti', this.allMultiModifier, $Operation.MULTIPLY_TOTAL)
            attributeInstance.addPermanentModifier(attributeModifier)
        }
    }
}