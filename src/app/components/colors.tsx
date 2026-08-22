"use client"

import React from 'react';

interface ColorsProps{
    color: string;
    index: number;
    handleColorChange: (color: ColorsProps["color"]) => void;
    selectedColors: Array<string>;
}

export function Colors( { color, index, handleColorChange, selectedColors }: ColorsProps ) {

    return (
        <label key={index}>
        <input 
            type="checkbox" 
            name={color} 
            value={color}  
            checked={selectedColors.includes( color )} 
            onChange={() => handleColorChange( color )} 
        /> 
        {color}
    </label>
    );
}
