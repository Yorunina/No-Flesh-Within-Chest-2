// priority: 2000
function MoonDataModel() {
    this.moonSize = 20
    this.moonShaderColor = new RGB(1, 1, 1)
}
MoonDataModel.prototype = {
    setMoonShaderColor(r, g, b) {
        this.moonShaderColor = new RGB(r, g, b)
        return this
    },
    setMoonSize(size) {
        this.moonSize = size
        return this
    },
    getMoonShaderColor() {
        return this.moonShaderColor
    },
    getMoonSize() {
        return this.moonSize
    },
    reset() {
        this.moonSize = 20
        this.moonShaderColor = new RGB(1, 1, 1)
    }
}