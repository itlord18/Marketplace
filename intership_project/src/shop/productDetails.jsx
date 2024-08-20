export function ProductDetails({ product, quantity, onQuantityChange, onAddToBasket, isInBasket }) {
    
    const { id, title, price, inventory, color } = product;
    const orderPrice = parseFloat(quantity * price).toFixed(2);

    return (
        <div className="single-product">
            <div className='cardDetails' key={id}>
                <div className='cardDetailsImage'></div>
                <div className='cardDetailsInfo'>
                    <h4>{title}</h4><br />
                    <p>Price: {price}<br />
                    Inventory: {inventory}<br />
                    Color: {color}</p>
                    Your order:<br />
                    Quantity: <input type="number" value={quantity} min="1" max={inventory} onChange={onQuantityChange} /><br />
                    Price: {orderPrice} <br />
                    {isInBasket ? 
                        <p style={{color: "red", fontSize: 32}}>You have this product in the basket</p> : 
                        <button onClick={onAddToBasket}>Add to Basket</button>}
                </div>
            </div>
        </div>
    );
}
