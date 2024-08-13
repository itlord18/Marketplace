export function ProductDetails({ product, quantity, onQuantityChange, onAddToBasket, isInBasket }) {
    return (
        <div className='cardDetails'>
            <div className='cardDetailsImage'></div>
            <div className='cardDetailsInfo'>
                <h4>{product.title}</h4><br />
                <p>Price: {product.price}<br />
                Inventory: {product.inventory}</p>
                Your order:<br />
                Quantity: <input type="number" value={quantity} min="1" max={product.inventory} onChange={onQuantityChange}/><br />
                Price: {parseFloat(quantity * product.price).toFixed(2)} <br />
                {isInBasket ? 
                    <p style={{color: "red", fontSize: 32}}>You have this product in the basket</p> : 
                    <button onClick={onAddToBasket}>Add to Basket</button>}
            </div>
        </div>
    );
}
