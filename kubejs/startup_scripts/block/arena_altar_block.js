// priority: 1000
JadeEvents.onCommonRegistration((event) => {
    event.blockDataProvider('skyarena:altar_block', $AltarBlockEntity)
        .setCallback((tag, accessor) => {
            /**@type {Internal.AltarBlockEntity} */
            const blockEntity = accessor.getBlockEntity()
            if (!blockEntity) return
            tag.putInt('difficult_level', blockEntity.getDifficultyLevel())
            tag.putString('arena_type', blockEntity.getArenaType())
            tag.put('modifier_list', blockEntity.getModifierList())
        })
})
