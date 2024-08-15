export function BasketDetails({ product, onUpdateBasket }) {

    const {title, price, quantity} = product
    const orderPrice = quantity * (price / quantity)
    
    return (
        <div className='cardDetails' >
            <div className='cardDetailsImage'></div>
            <div className='cardDetailsInfo'>
                <h4>{title}</h4><br />
                Your order:<br />
                Quantity: {quantity}<br />
                Order price: {orderPrice} <br />
                <button onClick={onUpdateBasket}>Change order</button>
            </div>
        </div>
    );
}
