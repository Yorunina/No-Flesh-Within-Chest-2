// priority: 3000
/**
 * 
 * @param {Internal.Level} level 
 * @returns {Internal.Map<BlockPos, Internal.DepositGenResult>}
 */
function GetDeposits(level) {
    return $WorldDeposits.get(level).generated()
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {BlockPos} pos 
 * @param {number} radius 
 * @returns 
 */
function GetDepositsAround(level, pos, radius) {
    let depositsWithinRadius = []
    const curChunk = new $ChunkPos(pos)
    GetDeposits(level).forEach((depositPos, depositRes) => {
        if ($AbstractOre.withinRadius(new $ChunkPos(depositPos), curChunk, radius)) {
            depositsWithinRadius.push(depositRes)
        }
    })
    return depositsWithinRadius
}

/**
 * 
 * @param {Internal.Level} level 
 * @param {string} name 
 * @returns {Internal.DepositGenResult[]}
 */
function GetDepositsByType(level, name) {
    let depositsWithinRadius = []
    GetDeposits(level).forEach((depositPos, depositRes) => {
        if (depositRes.name == name) {
            depositsWithinRadius.push(depositRes)
        }
    })
    return depositsWithinRadius
}