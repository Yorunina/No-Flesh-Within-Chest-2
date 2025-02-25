// priority: 2000

function MpmDataModel(id) {
    this.id = id
    this.usePlayerSkin = false
    this.url = ''
    this.texture = ''
    this.color = '#ffffff'
    return this
}
MpmDataModel.prototype = {
    setId : function(id) {
        this.id = id
        return this 
    },
    setUsePlayerSkin : function(usePlayerSkin) {
        this.usePlayerSkin = usePlayerSkin
        return this 
    },
    setUrl : function(url) {
        this.url = url
        return this
    },
    setTexture : function(texture) {
        this.texture = texture
        return this
    },
    setColor : function(color) {
        this.color = color
        return this 
    },
    serializNbt : function() {
        let nbt = new $CompoundTag()
        let color = HexToRgb(this.color)
        nbt.putString('Id', this.id)
        nbt.putBoolean('UsePlayerSkin', this.usePlayerSkin)
        nbt.putString('Url', this.url)
        nbt.putString('Texture', this.texture)
        nbt.putInt('ColorR', Math.floor(color[0] / 128))
        nbt.putInt('ColorG', Math.floor(color[1] / 128))
        nbt.putInt('ColorB', Math.floor(color[2] / 128))
        return nbt
    },
    exportModelData: function() {
        let res = new $MpmPartData()
        res.setNbt(this.serializNbt())
        return res
    }
}
