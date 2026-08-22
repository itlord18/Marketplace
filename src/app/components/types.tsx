"use client"

import React from 'react';

interface TypesProps{
    type: string;
    index: number;
    handleTypeChange: (color: TypesProps["type"]) => void;
    selectedTypes: Array<string>;
}

export function Types( { type, index, handleTypeChange, selectedTypes }: TypesProps ) {
    
    return (
        <label key={index}>
            <input 
                type="checkbox" 
                name={type} 
                value={type} 
                checked={selectedTypes.includes( type )} 
                onChange={() => handleTypeChange( type )} 
                /> 
            {type}
        </label>
    );
}
