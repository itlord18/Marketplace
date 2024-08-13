export function ProductDetails({ product, quantity, onQuantityChange, onAddToBasket, isInBasket }) {

    const title = product.title
    const price = product.price
    const inventory = product.inventory
    
    return (
        <div className='cardDetails'>
            <div className='cardDetailsImage'></div>
            <div className='cardDetailsInfo'>
                <h4>{title}</h4><br />
                <p>Price: {price}<br />
                Inventory: {inventory}</p>
                Your order:<br />
                Quantity: <input type="number" value={quantity} min="1" max={inventory} onChange={onQuantityChange}/><br />
                Price: {parseFloat(quantity * price).toFixed(2)} <br />
                {isInBasket ? 
                    <p style={{color: "red", fontSize: 32}}>You have this product in the basket</p> : 
                    <button onClick={onAddToBasket}>Add to Basket</button>}
            </div>
        </div>
    );
}
