// priority: 2000
/**
 * 农业工艺杂交配方
 * @param {string} child 
 * @param {string} parent1 
 * @param {string} parent2 
 */
function AgricraftMutationRecipeModel(child, parent1, parent2) {
    this.chance = 1
    this.child = child
    this.parent1 = parent1
    this.parent2 = parent2
}

AgricraftMutationRecipeModel.prototype = {
    /**
     * @param {number} chance 
     */
    setChance(chance) {
        this.chance = chance
        return this
    },
    /**
     * @param {Internal.RecipesEventJS} event 
     */
    build(event) {
        return event.custom(this)
    }
}