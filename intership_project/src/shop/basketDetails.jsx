export function BasketDetails({ product, onUpdateBasket }) {

    const title = product.title
    const price = product.price
    const quantity = product.quantity
    
    return (
        <div className='cardDetails'>
            <div className='cardDetailsImage'></div>
            <div className='cardDetailsInfo'>
                <h4>{title}</h4><br />
                Your order:<br />
                Quantity: {quantity}<br />
                Price: {quantity * (price / quantity)} <br />
                <button onClick={onUpdateBasket}>Change order</button>
            </div>
        </div>
    );
}
