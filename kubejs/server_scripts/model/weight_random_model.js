// priority: 3000
/**
 * 权重随机对象
 * @param {any} obj 
 * @param {Number} weight
 * @returns 
 */
function WeightRandomItem(obj, weight) {
    this.obj = obj
    this.weight = weight
    this.startWeight = 0
    this.endWeight = 0
}

function WeightRandomModel() {
    this.weightRandomList = []
}
WeightRandomModel.prototype = {
    addWeightRandom: function (obj, weight) {
        this.weightRandomList.push(new WeightRandomItem(obj, weight))
        return this
    },
    getWeightRandomObj: function () {
        let totalWeight = this.weightRandomList.reduce(function (pre, cur, index) {
            cur.startWeight = pre
            return cur.endWeight = pre + cur.weight
        }, 0)
        let random = Math.ceil(Math.random() * totalWeight)
        let randomObj = this.weightRandomList.find(weightObj => weightObj.startWeight < random && weightObj.endWeight >= random)
        return randomObj.obj
    },
    /**
     * 非重复取出多个权重随机对象
     * @param {number} count 
     * @returns 
     */
    getWeightRandomObjs: function (count) {
        let objs = []
        let tempWeightRandomList = this.weightRandomList.slice()
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < tempWeightRandomList.length; j++) {
                if (tempWeightRandomList[j].startWeight < random && tempWeightRandomList[j].endWeight >= random) {
                    objs.push(tempWeightRandomList[j].obj)
                    tempWeightRandomList.splice(j, 1)
                    break
                }
            }
        }
        return objs
    }
}
