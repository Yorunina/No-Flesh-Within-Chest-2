// priority: 500
let VOLT_RUSH_SPEED = 3.0
let VOLT_RUSH_UP_MULT = 0.6
let VOLT_RUSH_UP_GROUND = 0.15
let VOLT_RUSH_HOP = 1.2
let VOLT_RUSH_CHARGE_TICKS = 10
let VOLT_RUSH_DURABILITY_COST = 2
let VOLT_RUSH_MANA_COST = 25

function VoltRushRiptideLevel(stack) {
    return stack.getEnchantmentLevel('minecraft:riptide')
}

function VoltRushAvailable(item, stack) {
    return item.getEffectLevel(stack, 'kubejs:volt_rush') > 0
        && VoltRushRiptideLevel(stack) > 0
}

function VoltRushOnGround(player) {
    return player.nbt.getBoolean('OnGround')
}

function VoltRushFire(player, stack) {
    let modularItem = stack.getItem()

    if (!player.isCreative() && !(player.isInWaterOrRain() || player.level.isThundering())) {
        let md = $MagicData.getPlayerMagicData(player)
        let mana = md.getMana()
        let cost = Math.max(0, VOLT_RUSH_MANA_COST * (1 - modularItem.getEffectLevel(stack, 'kubejs:magic_reduction') / 100))
        if (mana < cost) return
        md.setMana(mana - cost)
    }

    let level = modularItem.getEffectLevel(stack, 'kubejs:volt_rush')
    let attack = player.getAttribute('minecraft:generic.attack_damage').getValue()
    let damage = Math.max(1, Math.floor(attack * level / 100))
    if (player.level.isThundering()) { damage *= 3 }
    else if (player.isInWaterOrRain()) { damage = Math.floor(damage * 1.5) }

    player.addEffect(new $MobEffectInstance('irons_spellbooks:volt_strike', 10, damage, false, false, false))

    let grounded = VoltRushOnGround(player)
    let forward = player.getLookAngle()
    let lift = Math.max(forward.y(), 0) * VOLT_RUSH_UP_MULT + (grounded ? VOLT_RUSH_UP_GROUND : 0)
    let vec = forward.scale(VOLT_RUSH_SPEED).add(new $Vec3(0, lift, 0))

    if (grounded) {
        let px = player.getX(), py = player.getY(), pz = player.getZ()
        player.teleportTo(px, py + VOLT_RUSH_HOP, pz)
    }
    let dm = player.getDeltaMovement()
    player.setDeltaMovement(new $Vec3(
        dm.x() * 0.25 + vec.x() * 0.75,
        dm.y() * 0.25 + vec.y() * 0.75,
        dm.z() * 0.25 + vec.z() * 0.75
    ))
    player.hasImpulse = true
    player.hurtMarked = true

    player.level.playSound(null, player.getX(), player.getY(), player.getZ(),
        'irons_spellbooks:cast.generic.lightning', 'players', 1.0, 0.9 + Math.random() * 0.2)

    $MagicData.getPlayerMagicData(player).getSyncedData().setSpinAttackType($SpinAttackType.LIGHTNING)
    modularItem.applyDamage(VOLT_RUSH_DURABILITY_COST, stack, player)
}

TetraJSEvents.registerChargedAbility(event => {
    event.register('kubejs:volt_rush')
        .setChargeTime(VOLT_RUSH_CHARGE_TICKS)
        .setPriority(1000)
        .setOverrideRiptide(true)
        .setPose('none')
        .availableWhen(VoltRushAvailable)
        .onPerform(context => VoltRushFire(context.player(), context.stack()))
})
