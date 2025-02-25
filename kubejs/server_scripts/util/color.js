// priority: 3000

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