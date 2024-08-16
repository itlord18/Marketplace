export function BasketProductCard({ product, onSelect }) {

    const {id, title, price, quantity} = product
    
    return (
        <div className='card' onClick={() => onSelect(id)}>
            <div className='cardImage'></div>
            <div className='cardInfo'>
                <h4>{title}</h4><br />
                <p>Price: {price}<br />
                Quantity: {quantity}</p>
            </div>
        </div>
    );
}
