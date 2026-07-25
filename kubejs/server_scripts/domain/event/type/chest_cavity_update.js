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
            customData.attackDamage.applyOnEntityByAttributeKey(entity, 'OrganAttackDamage')
            customData.maxHealth.applyOnEntityByAttributeKey(entity, 'OrganMaxHealth')
            customData.armor.applyOnEntityByAttributeKey(entity, 'OrganArmor')
            customData.entityReach.applyOnEntityByAttributeKey(entity, 'OrganEntityReach')
            customData.blockReach.applyOnEntityByAttributeKey(entity, 'OrganBlockReach')
        }
    )

ChestCavityEvents.evaluateChestCavity(event => {
    const entity = event.entity
    let customData = {}
    if (!entity.isAlive()) return
    OrganTakeOffStrategy.run(entity, customData, [event])
    OrganTakeOnStrategy.run(entity, customData, [event])
    OrganChestCavityUpdateStrategy.run(entity, customData, [event])
    SlotChestCavityUpdateStrategy.run(entity, customData, [event])
    UpdateClientISSSpellDataEvent(customData, entity)
})
