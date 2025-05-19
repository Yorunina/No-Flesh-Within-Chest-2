// priority: 3000
/**
 * 
 * @param {number} duration 
 * @param {Internal.MutableComponent} text 
 * @returns {Internal.ImmersiveMessage}
 */
function BuildIMessage(duration, text) {
    return $ImmersiveMessage
        ["builder(float,net.minecraft.network.chat.MutableComponent)"](duration, text)
        .anchor($TextAnchor.CENTER_CENTER)
        .size(3)
        ["color(int)"](0xFFFFFF)
        // ["font(java.lang.String)"]("immersivemessages:font/impact.ttf")
        .fadeIn(1)
        .fadeOut(1)
}