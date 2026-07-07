// priority: 2000
/**
 * @param {string} speciesDom
 * @param {string} plantRec
 */
function AgricraftSeedBuilder(speciesDom, speciesRec) {
    this.speciesDom = speciesDom
    this.speciesRec = speciesRec
    this.fertilityDom = 1
    this.fertilityRec = 1
    this.gainDom = 1
    this.gainRec = 1
    this.growthDom = 1
    this.growthRec = 1
    this.mutativityDom = 1
    this.mutativityRec = 1
    this.resistanceDom = 1
    this.resistanceRec = 1
    this.strengthDom = 1
    this.strengthRec = 1
}

AgricraftSeedBuilder.prototype = {
    setFertility(fertilityDom, fertilityRec) {
        this.fertilityDom = fertilityDom
        this.fertilityRec = fertilityRec
        return this
    },
    setGain(gainDom, gainRec) {
        this.gainDom = gainDom
        this.gainRec = gainRec
        return this
    },
    setGrowth(growthDom, growthRec) {
        this.growthDom = growthDom
        this.growthRec = growthRec
        return this
    },
    setMutativity(mutativityDom, mutativityRec) {
        this.mutativityDom = mutativityDom
        this.mutativityRec = mutativityRec
        return this
    },
    setResistance(resistanceDom, resistanceRec) {
        this.resistanceDom = resistanceDom
        this.resistanceRec = resistanceRec
        return this
    },
    setStrength(strengthDom, strengthRec) {
        this.strengthDom = strengthDom
        this.strengthRec = strengthRec
        return this
    },
    build() {
        return Item.of('agricraft:seed', `{genes:{fertility:{dom:${this.fertilityDom},rec:${this.fertilityRec}},gain:{dom:${this.gainDom},rec:${this.gainRec}},growth:{dom:${this.growthDom},rec:${this.growthRec}},mutativity:{dom:${this.mutativityDom},rec:${this.mutativityRec}},resistance:{dom:${this.resistanceDom},rec:${this.resistanceRec}},species:{dom:"${this.speciesDom}",rec:"${this.speciesRec}"},strength:{dom:${this.strengthDom},rec:${this.strengthRec}}}}`)
    }
}