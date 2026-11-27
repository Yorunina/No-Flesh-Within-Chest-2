// priority: 999
const TetraProjectileImpactEvent = new TetraEffectEventModel('projectile_impact')

// 普通命中保留独立监听器，事件取消后停止后续策略。
NativeEvents.onEvent($ProjectileImpactEvent, /** @param {Internal.ProjectileImpactEvent} event */ event => {
    const projectile = event.projectile
    // Forge 原生事件总线也接收客户端世界的碰撞，策略只在逻辑服务端结算。
    if (projectile.level.isClientSide()) return

    let customData = {}
    TetraProjectileImpactEvent.run(projectile, customData, [event])
})
