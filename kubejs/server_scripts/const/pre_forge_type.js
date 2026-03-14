// priority: 4000
const PreForgeTypeFlamberge = 'flamberge'
const PreForgeTypePrimordialCradle = 'primordial_cradle'
const PreForgeTypeMechanicalSaw = 'mechanical_saw'

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @param {String} preForgeType 
 * @returns 
 */
function SetPreForgeType(stack, preForgeType) {
    if (!stack.hasNBT()) return
    let nbt = stack.getNbt()
    nbt.putString('preForgeType', preForgeType)
}

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @param {String} preForgeType 
 * @returns {boolean}
 */
function IsPreForge(stack, preForgeType) {
    let nbt = stack.getOrCreateTag()
    return nbt.getString('preForgeType') == preForgeType
}
