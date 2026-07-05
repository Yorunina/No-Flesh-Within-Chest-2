// priority: 500
const ORGAN_EFFECT_OVERLAY_PATH = 'organ_effect_overlay.html'
const ORGAN_EFFECT_SYNC_CHANNEL = 'organ_effect_sync'
const MAX_ORGAN_EFFECT_SLOTS = 5

let overlayHasEffects = false
let screenOpen = false
let currentPanelStyle = ''
let lastEffects = null

ClientEvents.loggedIn(event => {
    ensureOverlayDocument()
})

ClientEvents.tick(event => {
    let nowScreenOpen = Client.screen != null
    if (nowScreenOpen != screenOpen) {
        screenOpen = nowScreenOpen
        applyPanelVisibility()
        if (!screenOpen && overlayHasEffects && lastEffects != null) {
            updateOrganEffectSlots(lastEffects)
        }
    }
})


NetworkEvents.dataReceived(ORGAN_EFFECT_SYNC_CHANNEL, event => {
    let effectsList = event.data.getList('effects', 10)
    let effects = []
    let size = effectsList.size()
    for (let i = 0; i < size; i++) {
        let tag = effectsList.get(i)
        effects.push({
            itemId: String(tag.getString('itemId')),
            customText: String(tag.getString('customText')),
            visible: tag.getBoolean('visible'),
            overlay: tag.getBoolean('overlay'),
            priority: tag.getInt('priority')
        })
    }
    effects.sort((a, b) => b.priority - a.priority)
    updateOrganEffectOverlay(effects)
})


function ensureOverlayDocument() {
    let docs = ApricityUI.getDocument(ORGAN_EFFECT_OVERLAY_PATH)
    if (docs != null && !docs.isEmpty()) return docs.get(0)
    return ApricityUI.createDocument(ORGAN_EFFECT_OVERLAY_PATH)
}

function applyPanelVisibility() {
    let doc = ensureOverlayDocument()
    if (doc == null) return
    let panel = doc.getElementById('organ-effect-panel')
    if (panel == null) return

    let shouldShow = overlayHasEffects && !screenOpen
    let targetStyle = shouldShow ? 'visibility: visible;' : 'visibility: hidden;'

    if (targetStyle != currentPanelStyle) {
        panel.setAttribute('style', targetStyle)
        currentPanelStyle = targetStyle
        if (!shouldShow) clearAllChildrenInlineStyle(doc)
    }
}

function updateOrganEffectOverlay(effects) {
    lastEffects = effects
    if (effects.length === 0) {
        overlayHasEffects = false
        applyPanelVisibility()
        return
    }
    overlayHasEffects = true
    applyPanelVisibility()
    // Screen 打开时不更新子元素，避免 innerText 在容器 UI 层渲染
    if (screenOpen) return
    updateOrganEffectSlots(effects)
}

function updateOrganEffectSlots(effects) {
    let doc = ensureOverlayDocument()
    if (doc == null) return

    for (let i = 0; i < MAX_ORGAN_EFFECT_SLOTS; i++) {
        let slot = doc.getElementById('effect-slot-' + i)
        let text = doc.getElementById('effect-text-' + i)
        if (slot == null) continue

        if (i < effects.length && effects[i].visible) {
            let effect = effects[i]
            slot.innerText = ''
            if (text != null) {
                if (effect.overlay && effect.customText && effect.customText.length > 0) {
                    text.innerText = effect.customText
                    text.setAttribute('style', 'visibility: visible;')
                } else {
                    text.innerText = ''
                    text.removeAttribute('style')
                }
            }
        } else {
            slot.innerText = ''
            if (text != null) {
                text.innerText = ''
                text.removeAttribute('style')
            }
        }
    }
}

function clearAllChildrenInlineStyle(doc) {
    for (let i = 0; i < MAX_ORGAN_EFFECT_SLOTS; i++) {
        let slot = doc.getElementById('effect-slot-' + i)
        let text = doc.getElementById('effect-text-' + i)
        if (slot != null) {
            slot.innerText = ''
            slot.removeAttribute('style')
        }
        if (text != null) {
            text.innerText = ''
            text.removeAttribute('style')
        }
    }
}
