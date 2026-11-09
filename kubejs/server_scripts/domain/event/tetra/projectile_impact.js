// priority: 500

const TetraProjectileImpactEvent = new TetraEffectEventModel('projectile_impact')
const TetraProjectileImpactCanceledEvent = new TetraEffectEventModel('projectile_impact_canceled')

// 普通命中保留独立监听器的取消检查；后续策略读取当前实体状态。
NativeEvents.onEvent($EventPriority.NORMAL, false, $ProjectileImpactEvent,
    /** @param {Internal.ProjectileImpactEvent} event */ event => {
        let customData = {}
        TetraProjectileImpactEvent.run(customData, [event], true)
    })

NativeEvents.onEvent($EventPriority.LOWEST, true, $ProjectileImpactEvent,
    /** @param {Internal.ProjectileImpactEvent} event */ event => {
        let customData = {}
        TetraProjectileImpactCanceledEvent.run(customData, [event])
    })
