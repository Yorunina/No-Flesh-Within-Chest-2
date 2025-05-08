// priority: 999

const OrganChestCavityUpdateStrategy = new OrganEventModel('chest_cavity_update')
const OrganTakeOnStrategy = new OrganTakeOnStrategyModel()
const OrganTakeOffStrategy = new OrganTakeOffStrategyModel()
    .addInit(
        /** 
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
            customData.attackDamage = new AttributeManagerModel(1)
            customData.maxHealth = new AttributeManagerModel(1)
            customData.armor = new AttributeManagerModel(1)
            customData.entityReach = new AttributeManagerModel(1)
            customData.blockReach = new AttributeManagerModel(1)
        }
    )


const SlotChestCavityUpdateStrategy = new SlotStrategyModel()
    .addDefer(
        /**
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
            const entity = event.entity
            customData.attackDamage.applyOnEntityByAttributeKey(entity, 'minecraft:generic.attack_damage', 'OrganAttackDamage')
            customData.maxHealth.applyOnEntityByAttributeKey(entity, 'minecraft:generic.max_health', 'OrganMaxHealth')
            customData.armor.applyOnEntityByAttributeKey(entity, 'minecraft:generic.armor', 'OrganArmor')
            customData.entityReach.applyOnEntityByAttributeKey(entity, 'forge:entity_reach', 'OrganEntityReach')
            customData.blockReach.applyOnEntityByAttributeKey(entity, 'forge:block_reach', 'OrganBlockReach')
        }
    )

ChestCavityEvents.evaluateChestCavity(event => {
    const entity = event.entity
    let customData = {}
    if (!entity.isAlive()) return
    // 器官摘下 - 通常用于归位操作
    customData.modelData = null
    customData.canLoadMpm = IsLoadedMPM && entity.isPlayer()
    if (customData.canLoadMpm && !entity.connection) {
        let modelData = $ModelData.get(entity)
        modelData.mpmParts.clear()
        customData.modelData = modelData
    }
    OrganTakeOffStrategy.run(entity, customData, [event])
    OrganTakeOnStrategy.run(entity, customData, [event])
    OrganChestCavityUpdateStrategy.run(entity, customData, [event])
    SlotChestCavityUpdateStrategy.run(entity, customData, [event])

    if (customData.canLoadMpm && customData.modelData) {
        if (!entity.connection) {
            SetCustomDataMap(entity.chestCavityInstance, 'mpmModelDataNBT', customData.modelData.writeToNBT())
        } else {
            UpdateMpm(entity, customData.modelData)
        }
    }
    UpdateClientISSSpellDataEvent(customData, entity)
})


PlayerEvents.loggedIn(event => {
    event.server.scheduleInTicks(20, () => {
        const player = event.player
        let mpmModelDataNBT = GetCustomDataMap(player.chestCavityInstance, 'mpmModelDataNBT', null)
        if (!mpmModelDataNBT) return
        $MpmPackets.sendNearby(player, new $PacketPlayerDataSend(player.getUuid(), mpmModelDataNBT))
    })
})