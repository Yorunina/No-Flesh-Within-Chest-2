// priority: 3000

const ChocolateCoinList = ['lightmanscurrency:coin_chocolate_netherite', 'lightmanscurrency:coin_chocolate_diamond', 'lightmanscurrency:coin_chocolate_emerald', 'lightmanscurrency:coin_chocolate_gold', 'lightmanscurrency:coin_chocolate_iron', 'lightmanscurrency:coin_chocolate_copper']

const CoinList = ['lightmanscurrency:coin_netherite', 'lightmanscurrency:coin_diamond', 'lightmanscurrency:coin_emerald', 'lightmanscurrency:coin_gold', 'lightmanscurrency:coin_iron', 'lightmanscurrency:coin_copper']
// $BankAPI.API.BankDepositFromServer()

/**
 * @param {number} value 
 * @returns {Internal.MoneyValue}
 */
function ConvertMainMoneyValue(value) {
    return $CoinValue.fromNumber('main', value)
}
/**
 * 
 * @param {Internal.ItemStack} item 
 * @returns {Internal.MoneyValue}
 */
function ConvertItem2MoneyValue(item) {
    return $CoinValue.fromItemOrValue(item.getItem(), item.getCount(), 0)
}

/**
 * 
 * @param {Internal.ItemStack} coinList 
 * @param {number} money 
 * @return {Internal.ItemStack[]}
 */
function ConvertMoneyIntoCoinItemList(coinList, money) {
    let i = 1
    let itemList = []
    coinList.forEach(coinItem => {
        let price = Math.pow(10, coinList.length - i)
        i++
        if (money < price) return
        let amount = Math.floor(money / price)
        itemList.push(Item.of(coinItem, amount))
        money = money - price * amount
    })
    return itemList
}