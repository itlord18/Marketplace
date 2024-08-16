export function BasketDetails({ basketProduct, productForBasket, quantity, onQuantityChange, onUpdateBasket }) {
 
    const {id, title} = basketProduct
    const {price, inventory, color} = productForBasket
    const orderPrice = parseFloat(quantity * price).toFixed(2)

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
                <button onClick={() => onUpdateBasket(id, title, orderPrice, quantity, color)}>Change order</button>
            </div>
        </div>
        </div>
    );
}
