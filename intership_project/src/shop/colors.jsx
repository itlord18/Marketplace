export function Colors({ color, index, handleColorChange, selectedColors }) {

    return (
        <label key={index}>
        <input 
            type="checkbox" 
            id={color} 
            name={color} 
            value={color}  
            checked={selectedColors.includes(color)} 
            onChange={() => handleColorChange(color)} 
        /> 
        {color}
    </label>
    );
}
