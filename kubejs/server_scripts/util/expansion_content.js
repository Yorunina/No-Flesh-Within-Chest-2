// priority: 3000

/**
 * 获取拓展包信息
 * @param {string} id 
 * @returns {string}
 */
function getExpansionContentInfoJson(id) {
    /** @type {ExpansionContentModel} */
    let expansionContent = global.expansionContents[id]
    return `{
        "translate":"${expansionContent.name}","hoverEvent": {"action": "show_text","contents":[
        {"translate":"${expansionContent.name}"},
        {"text":"\n"},
        {
            "translate":"msg.kubejs.expansion_content.modid",
            "with":[{"text":"${expansionContent.modid}"}]
        },
        {"text":"\n"},
        {
            "translate":"msg.kubejs.expansion_content.is_official",
            "with":[{"translate":"${expansionContent.is_official ? "msg.kubejs.expansion_content.yes" : "msg.kubejs.expansion_content.no"}"}]
        },
        {"text":"\n"},
        {
            "translate":"msg.kubejs.expansion_content.is_trusted",
            "with":[{"translate":"${expansionContent.is_trusted ? "msg.kubejs.expansion_content.yes" : "msg.kubejs.expansion_content.no"}"}]
        },
        {"text":"\n"},
        {
            "translate":"msg.kubejs.expansion_content.description",
            "with":[{"translate":"${expansionContent.description}"}]
        }
        ]}}`
}