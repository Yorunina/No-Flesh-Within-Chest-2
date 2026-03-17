// priority: 1000
// @Deprecated 能力迁移
// const SchematicShowStrategy = new StrategyModel()
// /**
//  * @typedef {Object} SchematicShowStrategyCustomData
//  * @property {Internal.List<Internal.UpgradeSchematic>} resList
//  */
// /**
//  * @param {String} key 
//  * @param {function(any[]): void} func 
//  */
// function RegistrySchematicShowStrategy(key, func) {
//     SchematicShowStrategy.addStrategy(key, func)
// }

// TetraJSEvents.workbenchTileUpdateSchematicList(event => {
//     const workbenchTile = event.workbenchTile
//     const stack = workbenchTile.getTargetItemStack()
//     if (!stack || stack.isEmpty()) return
//     if (!TetraJSUtils.isModularItem(stack.getItem())) return
//     const schematicList = event.schematicList
//     const customData = { resList: [] }
//     schematicList.forEach(schematic => {
//         let key = schematic.key
//         if (!SchematicShowStrategy.contains(key)) return customData.resList.push(schematic)
//         SchematicShowStrategy.strategyMap[key].apply(null, [customData, event, stack, schematic])
//     })
//     event.schematicList = customData.resList
// })