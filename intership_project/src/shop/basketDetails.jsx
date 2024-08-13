export function BasketDetails({ basketProduct, onUpdateBasket }) {
    return (
        <div className='cardDetails'>
            <div className='cardDetailsImage'></div>
            <div className='cardDetailsInfo'>
                <h4>{basketProduct.title}</h4><br />
                Your order:<br />
                Quantity: {basketProduct.quantity}<br />
                Price: {basketProduct.quantity * (basketProduct.price / basketProduct.quantity)} <br />
                <button onClick={onUpdateBasket}>Change order</button>
            </div>
        </div>
    );
}
