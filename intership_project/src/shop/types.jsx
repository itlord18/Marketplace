export function Types({ type, index, handleTypeChange, selectedTypes }) {
    
    return (
        <label key={index}>
            <input 
                type="checkbox" 
                id={type} 
                name={type} 
                value={type} 
                checked={selectedTypes.includes(type)} 
                onChange={() => handleTypeChange(type)} 
                /> 
            {type}
        </label>
    );
}
