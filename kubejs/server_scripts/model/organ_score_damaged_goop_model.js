// priority: 2000
function OrganScoreDamagedGoopModel(level, vec3) {
    this.goopEmitter = new $PositionGoopEmitter().markMature()
    this.level = level
    this.color = [255, 255, 255]
    this.vec3 = vec3
    this.velocity = new Vec4f(0, 0, 0, 0.3)
    this.amount = 1
    this.scale = 0.5
    this.changed = false
}

OrganScoreDamagedGoopModel.prototype = {
    multiplyColor(hexColor) {
        let rgbColor = HexToRgb(hexColor)
        this.color = Multiply(this.color, rgbColor)
        this.changed = true
        return this
    },
    addScale(scale) {
        return this
    },
    addAmount(amount) {
        this.amount += amount
        return this
    },
    multiplyVelocity(velocity) {
        this.velocity = this.velocity.add(velocity)
        return this
    },
    emit() {
        let color = RgbToHex2.apply(null, this.color)
        this.goopEmitter.emitInternal(this.level, this.vec3, color, this.velocity, this.amount, this.scale)
        return
    }
}
