// priority: 1000

function RgbToHex(r, g, b) {
    let hex = ((r << 16) | (g << 8) | b).toString(16)
    return "#" + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

function HexToRgb(hex) {
    let rgb = []
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
    }
    return rgb
}

function Gradient(startColor, endColor, step) {
    // 将 hex 转换为rgb
    let sColor = HexToRgb(startColor)
    let eColor = HexToRgb(endColor)

    // 计算R\G\B每一步的差值
    let rStep = (eColor[0] - sColor[0]) / step
    let gStep = (eColor[1] - sColor[1]) / step
    let bStep = (eColor[2] - sColor[2]) / step

    let gradientColorArr = []
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        gradientColorArr.push(RgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])))
    }
    return gradientColorArr
}


/**
 * 
 * @param {Internal.MutableComponent} text 
 * @param {string} startColor 
 * @param {string} endColor 
 */
function GradientText(text, startColor, endColor) {
    let textString = text.getString()
    let result = Text.empty()
    Gradient(startColor, endColor, textString.length()).forEach((color, index) => {
        result.append(Text.of(textString.charCodeAt(index)).color(Color.of(color)))
    })
    return result
}