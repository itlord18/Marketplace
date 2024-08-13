export function BasketProductCard({ product, onSelect }) {

    const id = product.id
    const title = product.title
    const price = product.price
    const quantity = product.quantity
    
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
