export function Colors({ color, index, handleColorChange, selectedColors }) {

    return (
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
    );
}
