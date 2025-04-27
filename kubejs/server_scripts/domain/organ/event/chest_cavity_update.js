// priority: 999

const OrganChestCavityUpdateStrategy = new OrganChestCavityUpdateStrategyModel()
const OrganTakeOnStrategy = new OrganTakeOnStrategyModel()
const OrganTakeOffStrategy = new OrganTakeOffStrategyModel()
    .addInit(
        /** 
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
            customData.modelData = null
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
    const { chestCavity, entity } = event
    let customData = {}
    if (!entity.isAlive()) return
    // 器官摘下 - 通常用于归位操作
    OrganTakeOffStrategy.run(chestCavity, [event], customData)
    OrganTakeOnStrategy.run(chestCavity, [event], customData)

    OrganChestCavityUpdateStrategy.run(chestCavity, [event], customData)
    SlotChestCavityUpdateStrategy.run(chestCavity, [event], customData)
    UpdateClientISSSpellDataEvent(customData, entity)
})