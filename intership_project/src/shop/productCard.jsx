export function ProductCard({ product, onSelect }) {
    return (
        <div className='card' onClick={() => onSelect(product.id)}>
            <div className='cardImage'></div>
            <div className='cardInfo'>
                <h4>{product.title}</h4><br />
                <p>Price: {product.price}<br />
                Inventory: {product.inventory}</p>
            </div>
        </div>
    );
}
