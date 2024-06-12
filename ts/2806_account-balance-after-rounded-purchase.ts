function accountBalanceAfterPurchase(purchaseAmount: number): number {
    return 100 - Math.round(purchaseAmount / 10) * 10
};

console.log(accountBalanceAfterPurchase(9))
console.log(accountBalanceAfterPurchase(15))