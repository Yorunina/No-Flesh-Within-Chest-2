// priority: 1000
const DestroyGlyphMaxHardness = 3.0
ArsNouveauEvents.registerGlyphs(event => {
    event.create('kubejs:glyph_horizon_destory', 'glyph_horizon_destory')
        .manaCost(5)
        .tier(SpellTier.ONE)
        .school(SpellSchools.ELEMENTAL_EARTH)
        .augments(ArsAugments.AOE)
        .onResolveBlock(ctx => {
            const hitPos = ctx.result.getBlockPos()
            const level = ctx.level
            const stats = ctx.stats

            const aoe = Math.max(0, Math.floor(stats.getAoeMultiplier()))

            const dir = ctx.shooter.facing
            const fx = dir.x
            const fz = dir.z

            for (let up = -1; up <= aoe; up++) {
                for (let fwd = 0; fwd <= aoe; fwd++) {
                    for (let side = -aoe; side <= aoe; side++) {
                        let pos = hitPos.offset(fx * fwd + (-fz) * side, up, fz * fwd + fx * side)
                        let state = level.getBlockState(pos)
                        if (state.isAir()) continue
                        let hardness = state.getDestroySpeed(level, pos)
                        if (hardness < 0 || hardness > DestroyGlyphMaxHardness) continue
                        level.destroyBlock(pos, false)
                    }
                }
            }
        })
})
