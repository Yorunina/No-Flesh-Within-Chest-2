// priority: 1500
const ROGUE_HUNT_SAFE_DIST = 128
const ROGUE_HUNT_RANK_STEP = 32
const ROGUE_HUNT_MOB_FLAG = 'rogue_hunt_mob'
const ROGUE_HUNT_DIM = 'kubejs:rogue_hunt'
const ROGUE_HUNT_PLAYER_TYPE = 'rogue_hunt'
const RogueHuntHealthUUID = UUID.fromString('3c7d2a91-6e54-4b18-9f0d-1a8c4b7e2f63')
const RogueHuntAttackUUID = UUID.fromString('a91f4c22-0b7e-4d65-8c13-9e6a2d5f84b0')
const RogueHuntArmorUUID = UUID.fromString('51b8e0d4-9c27-4f1a-a6d3-08e7c4b92f15')
const RogueHuntFollowUUID = UUID.fromString('e2c09b74-5a16-4d8f-b3c1-7f04e68a9d22')
const RogueHuntToughnessUUID = UUID.fromString('6d4a9e21-8b70-4c35-a1f2-3e59d80c7b46')
const RogueHuntSpeedUUID = UUID.fromString('9f18c4e7-2d53-4a6b-b90e-5c71a84f0d38')
const RogueHuntRelicsBossIds = [
    'cataclysm:ancient_remnant',
    'cataclysm:ignis',
    'cataclysm:maledictus',
    'cataclysm:netherite_monstrosity',
    'cataclysm:scylla',
    'cataclysm:the_harbinger',
    'cataclysm:the_leviathan',
    'block_factorys_bosses:yeti',
    'block_factorys_bosses:infernal_dragon',
    'block_factorys_bosses:sandworm',
    'block_factorys_bosses:kraken',
    'block_factorys_bosses:underworld_knight'
]

function CountRogueHuntMobs(level, player) {
    let count = 0
    level.getEntitiesWithin(player.boundingBox.inflate(64)).forEach(entity => {
        if (entity.persistentData.getBoolean(ROGUE_HUNT_MOB_FLAG)) count++
    })
    return count
}

function PlaceRogueHuntMobAround(mob, player, minDist, maxDist, rank) {
    let angle = Math.random() * Math.PI * 2
    let dist = minDist + Math.random() * (maxDist - minDist)
    let px = player.getX()
    let pz = player.getZ()
    let x = px + Math.cos(angle) * dist
    let z = pz + Math.sin(angle) * dist
    mob.setPos(x, 64, z)

    mob.persistentData.putBoolean(ROGUE_HUNT_MOB_FLAG, true)
    mob.persistentData.putInt('rogue_hunt_rank', rank)
}


function GetPlayerRank(player) {
    let px = player.getX()
    let pz = player.getZ()
    return Math.max(0, Math.floor((Math.sqrt(px * px + pz * pz) - ROGUE_HUNT_SAFE_DIST) / ROGUE_HUNT_RANK_STEP))
}

function AggroRogueHuntMob(mob, player) {
    if (mob.setAggressive) mob.setAggressive(true)
    if (mob.setTarget) mob.setTarget(player)
    let followAttr = mob.getAttribute('minecraft:generic.follow_range')
    if (followAttr) followAttr.addPermanentModifier(new $AttributeModifier(RogueHuntFollowUUID, 'RogueHuntFollow', 32, 'addition'))
}

/**
 * @param {Internal.SimplePlayerEventJS} event
 * @param {WeightRandomModel} pool
 * @param {{interval: number, nearbyCap: number, baseCount: number, rankDiv: number, waveCap: number, health: number, attack: number, armor: number, toughness?: number, speed?: number}} spec
 */
function TickRogueHuntIncense(event, pool, spec) {
    const player = event.player
    const level = event.level
    if (level.dimension != ROGUE_HUNT_DIM || level.difficulty.key == 'peaceful') return
    if (player.age % (spec.interval * 20) != 0) return

    let remain = spec.nearbyCap - CountRogueHuntMobs(level, player)
    if (remain <= 0) return

    const rank = GetPlayerRank(player)
    let n = Math.floor(Math.min(Math.min(spec.baseCount + rank / spec.rankDiv, spec.waveCap), remain))
    if (n <= 0) return

    for (let i = 0; i < n; i++) {
        let type = pool.getWeightRandomObj()
        let mob = level.createEntity(type)
        if (!mob) continue
        PlaceRogueHuntMobAround(mob, player, 16, 32, rank)
        ApplyRogueHuntMobAttributes(mob, rank, spec)
        mob.setHealth(mob.getMaxHealth())
        AggroRogueHuntMob(mob, player)
        mob.spawn()
    }
}

/**
 * @param {Internal.Entity} mob
 * @param {number} rank
 * @param {{health: number, attack: number, armor: number, toughness?: number, speed?: number}} spec
 */
function ApplyRogueHuntMobAttributes(mob, rank, spec) {
    let healthAttr = mob.getAttribute('minecraft:generic.max_health')
    if (rank <= 0) {
        if (healthAttr) healthAttr.setBaseValue(1)
        return
    }
    if (healthAttr && spec.health) {
        healthAttr.addPermanentModifier(new $AttributeModifier(RogueHuntHealthUUID, 'RogueHuntHealth', rank * spec.health, 'multiply_base'))
    }
    if (spec.attack) {
        let attackAttr = mob.getAttribute('minecraft:generic.attack_damage')
        if (attackAttr) attackAttr.addPermanentModifier(new $AttributeModifier(RogueHuntAttackUUID, 'RogueHuntAttack', rank * spec.attack, 'multiply_base'))
    }
    if (spec.armor) {
        let armorAttr = mob.getAttribute('minecraft:generic.armor')
        if (armorAttr) armorAttr.addPermanentModifier(new $AttributeModifier(RogueHuntArmorUUID, 'RogueHuntArmor', rank * spec.armor, 'addition'))
    }
    if (spec.toughness) {
        let toughnessAttr = mob.getAttribute('minecraft:generic.armor_toughness')
        if (toughnessAttr) toughnessAttr.addPermanentModifier(new $AttributeModifier(RogueHuntToughnessUUID, 'RogueHuntToughness', rank * spec.toughness, 'addition'))
    }
    if (spec.speed) {
        let speedAttr = mob.getAttribute('minecraft:generic.movement_speed')
        if (speedAttr) speedAttr.addPermanentModifier(new $AttributeModifier(RogueHuntSpeedUUID, 'RogueHuntSpeed', rank * spec.speed, 'multiply_base'))
    }
}
