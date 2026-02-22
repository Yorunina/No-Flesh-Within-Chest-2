// priority: 2000
const WormNeuronOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:defense', mean: 2, sigma: 1 }, 30)
    .addWeightRandom({ name: 'chestcavity:strength', mean: 2, sigma: 1 }, 30)
    .addWeightRandom({ name: 'chestcavity:health', mean: 1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:nerves', mean: 1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:endurance', mean: 0.5, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:breath_recovery', mean: 0.5, sigma: 0.5 }, 8)
    .addWeightRandom({ name: 'chestcavity:breath_capacity', mean: 0.5, sigma: 0.5 }, 8)
    .addWeightRandom({ name: 'chestcavity:detoxification', mean: 0.5, sigma: 0.5 }, 8)
    .addWeightRandom({ name: 'chestcavity:filtration', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:nutrition', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:digestion', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:metabolism', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:fire_resistant', mean: 0.5, sigma: 0.5 }, 3)
    .addWeightRandom({ name: 'chestcavity:knockback_resistant', mean: 0.5, sigma: 0.5 }, 3)

const WormNeuronPotentialOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'kubejs:extreme_fitness', mean: 1, sigma: 0.5 }, 30)
    .addWeightRandom({ name: 'kubejs:extreme_strength', mean: 1, sigma: 0.5 }, 30)
    .addWeightRandom({ name: 'kubejs:dragon_blood', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'kubejs:crit_damage', mean: 0.5, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'kubejs:crit_chance', mean: 0.5, sigma: 0.5 }, 10)
/**
 * @param {string} fluidId 
 */
function UnformedTumorFluidConfigModel(fluidId) {
    this.fluidId = fluidId
    this.organDataCount = 2
    this.potentialOrganDataCount = 1
    this.organDataModel = WormNeuronOrganDataWeightModel
    this.potentialOrganDataModel = WormNeuronPotentialOrganDataWeightModel
}


UnformedTumorFluidConfigModel.prototype = {
    /**
     * 
     * @param {number} count 
     * @returns 
     */
    setOrganDataCount: function (count) {
        this.organDataCount = count
        return this
    },
    /**
     * @param {number} count 
     * @returns 
     */
    setPotentialOrganDataCount: function (count) {
        this.potentialOrganDataCount = count
        return this
    },
    /**
     * @param {WeightRandomModel} model 
     * @returns 
     */
    setOrganDataModel: function (model) {
        this.organDataModel = model
        return this
    },
    /**
     * @param {WeightRandomModel} model 
     * @returns 
     */
    setPotentialOrganDataModel: function (model) {
        this.potentialOrganDataModel = model
        return this
    },
    /**
     * @returns {TumorOrganDataConfig[]}
     */
    getOrganDataAttri: function () {
        return this.organDataModel.getWeightRandomObjs(this.organDataCount)
    },
    /**
     * @returns {TumorOrganDataConfig[]}
     */
    getPotentialOrganDataAttri: function () {
        return this.potentialOrganDataModel.getWeightRandomObjs(this.potentialOrganDataCount)
    },
    genOrganData: function () {
        let organData = new $CompoundTag()
        this.getOrganDataAttri().forEach((attri) => {
            organData.putFloat(attri.name, FloorFix(NormalRandom(attri.mean, attri.sigma), 2))
        })
        return organData
    },
    genPotentialOrganData: function () {
        let organData = new $CompoundTag()
        this.getPotentialOrganDataAttri().forEach((attri) => {
            organData.putFloat(attri.name, FloorFix(NormalRandom(attri.mean, attri.sigma), 2))
        })
        return organData
    }
}
