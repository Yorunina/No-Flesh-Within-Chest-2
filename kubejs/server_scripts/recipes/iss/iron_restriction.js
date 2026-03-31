// priority: 500
LootJS.modifiers(event => {
    // 删除所有与铁魔法相关的物品掉落
    event.addLootTypeModifier(LootType.CHEST)
        .removeLoot(Ingredient.of('@irons_spellbooks'))
})

// 删除所有铁魔法相关基础配方
ServerEvents.recipes(event => {
    event.remove({ mod: 'irons_spellbooks' })
})