"use client"

import { Colors } from './colors';
import { Types } from './types';
import { Select } from '@chakra-ui/react';
import React from 'react';


interface FiltersProps {
  sort: string;
  setSort: (value: string) => void;
  productsColors: string[];
  productsTypes: string[];
  selectedColors: string[];
  selectedTypes: string[];
  handleColorChange: (color: string) => void;
  handleTypeChange: (type: string) => void;
}

export function Filters( { sort, setSort, productsColors, productsTypes, selectedColors, handleColorChange, selectedTypes, handleTypeChange }: FiltersProps ) {
    return (
        <div className='filters' >
            <Select id='sort' name='sort' value={sort} onChange={( e ) => setSort( e.target.value )}>
                <option id='none' value=''>None</option>
                <option id='ascending' value='_sort=price&_order=asc'>Ascending</option>
                <option id='descending' value='_sort=price&_order=desc'>Descending</option>
            </Select>
            
            Colors
            {productsColors.map( ( color, index ) => (
                <Colors key={index} color={color} handleColorChange={handleColorChange} selectedColors={selectedColors} index={index}/>
            ) )}
            
            Types
            {productsTypes.map( ( type, index ) => (
                <Types key={index} type={type} handleTypeChange={handleTypeChange} selectedTypes={selectedTypes} index={index} />
            ) )}

           
        </div>
    );
}
