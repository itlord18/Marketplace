export function Filters({ sort, setSort, productsColors, productsTypes, selectedColors, handleColorChange, selectedTypes, handleTypeChange, querySum }) {
    return (
        <div className='filters'>
            Sorting: 
            <select id='sort' name='sort' value={sort} onChange={(e) => setSort(e.target.value)}>
                <option id='none' name='none' value=''>None</option>
                <option id='ascending' name='ascending' value='_sort=price&_order=asc'>Ascending</option>
                <option id='descending' name='descending' value='_sort=price&_order=desc'>Descending</option>
            </select>
            
            Color:
            {productsColors.map((color, index) => (
                <label key={index}>
                    <input 
                        type="checkbox" 
                        id={color} 
                        name={color} 
                        value={color}  
                        checked={selectedColors} 
                        onChange={() => handleColorChange(color)} 
                    /> 
                    {color}
                </label>
            ))}

            Type:
            {productsTypes.map((type, index) => (
                <label key={index}>
                    <input 
                        type="checkbox" 
                        id={type} 
                        name={type} 
                        value={type} 
                        checked={selectedTypes} 
                        onChange={() => handleTypeChange(type)} 
                    /> 
                    {type}
                </label>
            ))}

            <button onClick={querySum}>Use Filters</button>
        </div>
    );
}
