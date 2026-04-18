// priority: 500
RegistryOrgan('kubejs:llama_gland')
    .addScore('chestcavity:speed', 1)
    .addScore('chestcavity:breath_recovery', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LlamaGlandKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let playerFacing = Vec3dNormalize(player.getForward())
    let llamaSpitEntity = new $LlamaSpit($EntityType.LLAMA_SPIT, level)
    llamaSpitEntity.setOwner(player)
    llamaSpitEntity.setPos(player.getX() - (player.getBbWidth() + 1.0) * 0.5 * JavaMath.sin(player.yBodyRot * JavaMath.PI / 180), player.getEyeY() - 0.1, player.getZ() + (player.getBbWidth() + 1.0) * 0.5 * JavaMath.cos(player.yBodyRot * (JavaMath.PI / 180)))
    llamaSpitEntity.setMotion(playerFacing.x() * 2, playerFacing.y() * 2, playerFacing.z() * 2)
    level.addFreshEntity(llamaSpitEntity)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:llama_gland')
        .addOnlyStrategy('key_active', LlamaGlandKeyActive)
)
   

