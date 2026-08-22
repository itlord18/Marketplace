import Decimal from 'decimal.js'


export function calculateOrderPrice(price: number, quantity: number, decimals: number = 2): string {
    
    if (price === undefined || price === null || isNaN(price)) {
        return '0.00';
    }
    if (quantity === undefined || quantity === null || isNaN(quantity)) {
        return '0.00';
    }
    
    try {
        const decimalPrice = new Decimal(price);
        const decimalQuantity = new Decimal(quantity);
        const result = decimalPrice.times(decimalQuantity);
        return result.toFixed(decimals);
    } catch (error) {
        console.error('Error calculating order price:', error);
        return '0.00';
    }
}

export function sumPrices(prices: number[]): string {
    if (!prices || !Array.isArray(prices) || prices.length === 0) {
        return '0.00';
    }
    
    try {
        const total = prices.reduce((sum, price) => {
            if (price === undefined || price === null || isNaN(price)) {
                return sum;
            }
            return sum.plus(new Decimal(price));
        }, new Decimal(0));
        return total.toFixed(2);
    } catch (error) {
        console.error('Error summing prices:', error);
        return '0.00';
    }
}


