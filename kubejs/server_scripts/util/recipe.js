// priority: 3000

// Java-only values avoid retaining a Rhino call scope through JS object parents.
// Stored fields contain snapshots and recipes, never the weak key or its Level.
const nativeItemRecipeMatches = new $WeakHashMap()
ServerEvents.recipes(event => nativeItemRecipeMatches.clear())

/**
 * 按弱引用作用域和处理位置缓存配方（包含未命中的 null）；输入使用单件快照。
 * @template T
 * @param {object | null | undefined} scope
 * @param {number | string | undefined} position
 * @param {string} query
 * @param {Internal.ItemStack} inputItem
 * @param {() => T | null} findRecipe
 * @returns {T | null}
 */
function GetCachedNativeRecipe(scope, position, query, inputItem, findRecipe) {
    if (!scope) return findRecipe()
    let matches = nativeItemRecipeMatches.get(scope)
    let cached = matches && matches.get(position)
    if (cached && cached.get('query') == query && $ItemStack.isSameItemSameTags(cached.get('input'), inputItem)) return cached.get('recipe')
    let recipe = findRecipe()
    if (!matches) {
        matches = new $HashMap()
        nativeItemRecipeMatches.put(scope, matches)
    }
    let record = new $HashMap()
    record.put('query', query)
    record.put('input', inputItem.copyWithCount(1))
    record.put('recipe', recipe)
    matches.put(position, record)
    return recipe
}

/**
 * 清除指定作用域中一个处理位置的配方缓存。
 * @param {object} scope
 * @param {number | string} position
 * @returns {void}
 */
function ClearCachedNativeRecipe(scope, position) {
    let matches = nativeItemRecipeMatches.get(scope)
    if (!matches) return
    matches.remove(position)
    if (matches.isEmpty()) nativeItemRecipeMatches.remove(scope)
}

/**
 * 依次查找熔炉、高炉、烟熏炉配方；提供作用域时复用缓存。
 * @param {Internal.Level} level
 * @param {Internal.ItemStack} inputItem
 * @param {object | null} [scope]
 * @param {number | string} [position]
 * @returns {Internal.AbstractCookingRecipe | null}
 */
function GetSmeltingRecipe(level, inputItem, scope, position) {
    return GetCachedNativeRecipe(scope, position, 'furnace|' + String(level.dimension), inputItem, () => {
        let inventory = new $SimpleContainer(inputItem)
        let manager = level.getRecipeManager()
        for (let type of ['minecraft:smelting', 'minecraft:blasting', 'minecraft:smoking']) {
            let recipe = manager.getRecipeFor(type, inventory, level)
            if (recipe.isPresent()) return recipe.get()
        }
        return null
    })
}
