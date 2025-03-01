// priority: 2000
global.expansionContents = {}

/**
 * 拓展包信息模型
 * @param {string} name - 此拓展包的名称，应为本地化键
 * @param {string} description - 此拓展包的描述，应为本地化键
 * @param {string} modid - 拓展包中所注册的新内容所使用的modid，同时也作为此拓展包的id
 * @param {boolean} is_official - 此拓展包是否由GoCampingTeam官方制作并发布
 * @param {boolean} is_trusted - 此拓展包是否受GoCampingTeam官方信任
 */
function ExpansionContentModel(name, description, modid, is_official, is_trusted) {
    this.name = name
    this.description = description
    this.modid = modid

    // todo 或许需要一个更安全的方式防止某些人随意设置这两个属性
    this.is_official = is_official
    this.is_trusted = is_trusted
}

/**
 * 注册拓展包
 * @param {ExpansionContentModel} expansionContentModel 
 */
function RegistryExpansionContentModel(expansionContentModel) {
    global.expansionContents[expansionContentModel.modid] = expansionContentModel
}