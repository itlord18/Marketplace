import { Colors } from './colors';
import { Types } from './types';
import { Button, Select } from '@chakra-ui/react';

export function Filters({ sort, setSort, productsColors, productsTypes, selectedColors, handleColorChange, selectedTypes, handleTypeChange, querySum }) {
    return (
        <div className='filters'>
            Sorting: 
            <Select id='sort' name='sort' value={sort} onChange={(e) => setSort(e.target.value)}>
                <option id='none' name='none' value=''>None</option>
                <option id='ascending' name='ascending' value='_sort=price&_order=asc'>Ascending</option>
                <option id='descending' name='descending' value='_sort=price&_order=desc'>Descending</option>
            </Select>
            
            Color:
            {productsColors.map((color, index) => (
                <Colors key={index} color={color} handleColorChange={handleColorChange} selectedColors={selectedColors} />
            ))}
            
            Type:
            {productsTypes.map((type, index) => (
                <Types key={index} type={type} handleTypeChange={handleTypeChange} selectedTypes={selectedTypes} />
            ))}

           
        </div>
    );
}
