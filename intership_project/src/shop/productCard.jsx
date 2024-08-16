export function ProductCard({ product, onSelect }) {

    const {id, title, price, inventory} = product

    return (
        <div className='card' key={id} onClick={() => onSelect(id)}>
            <div className='cardImage'></div>
            <div className='cardInfo'>
                <h4>{title}</h4><br />
                <p>Price: {price}<br />
                Inventory: {inventory}</p>
            </div>
        </div>
    );
}
