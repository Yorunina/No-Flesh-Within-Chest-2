// priority: 2000
function LightmansCustomGachaTraderModel() {
    /**@type {Internal.ItemStack[]} */
    this.storage = []
    this.price = new LightmansGachaPriceModel()
    this.type = 'lightmanscurrency:gacha'
    return this
}

LightmansCustomGachaTraderModel.prototype = {
    /** @param {Internal.ItemStack} item */
    addStorage: function (item) {
        this.storage.push(item)
        return this
    },
    /** @param {Internal.ItemStack[]} items */
    setStorage: function (items) {
        this.storage = items
        return this
    },
    /** @returns {Internal.CompoundTag} */
    write: function () {
        const nbt = new $CompoundTag()
        nbt.put('Price', this.price.write())
        const storageList = new $ListTag()
        for (let i = 0; i < this.storage.length; i++) {
            let pNbt = new $CompoundTag()
            let pItem = this.storage[i]
            pNbt.putInt('Count', pItem.getCount())
            pNbt.putString('id', pItem.getId())
            if (pItem.hasNBT()) {
                pNbt.put('tag', pItem.getNbt())
            }
            pNbt.putInt('Slot', i)
            storageList.add(pNbt)
        }
        nbt.put('Storage', storageList)
        nbt.putString('Type', this.type)
        return nbt
    },
}


function LightmansGachaPriceModel() {
    this.value = 30
    this.chain = 'main'
    this.type = 'lightmanscurrency:coins'
    return this
}

LightmansGachaPriceModel.prototype = {
    /** @param {number} value */
    setPrice: function (price) {
        this.value = price
        return this
    },
    /** @returns {Internal.CompoundTag} */
    write: function () {
        const nbt = new $CompoundTag()
        const priceList = new $ListTag()
        ConvertMoneyIntoCoinItemList(CoinList, this.value).forEach(item => {
            let pNbt = new $CompoundTag()
            pNbt.putString('Coin', item.getId())
            pNbt.putInt('Amount', item.getCount())
            priceList.add(pNbt)
        })
        nbt.put('Value', priceList)
        nbt.putString('Chain', this.chain)
        nbt.putString('type', this.type)
        return nbt
    },
}