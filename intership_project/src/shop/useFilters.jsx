import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useFilters() {
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sort, setSort] = useState('');
    const [query, setQuery] = useState('');

    const navigate = useNavigate();
    

    const handleColorChange = (color) => {
        setSelectedColors((prevColors) =>
            prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
        );
    };

    const handleTypeChange = (type) => {
        setSelectedTypes((prevTypes) =>
            prevTypes.includes(type) ? prevTypes.filter((t) => t !== type) : [...prevTypes, type]
        );
    };

    const querySum = () => {
        let prevQuery = '';

        if (selectedTypes.length > 0) {
            prevQuery += `type=${selectedTypes.join('&type=')}&`;
        }
    
        if (selectedColors.length > 0) {
            prevQuery += `color=${selectedColors.join('&color=')}&`;
        }

        if (sort) {
            prevQuery += `${sort}&`;
        }

        setQuery(prevQuery.slice(0, -1));
        navigate({ search: prevQuery.slice(0, -1) });
    };

    return {
        selectedColors,
        setSelectedColors,
        selectedTypes,
        setSelectedTypes,
        sort,
        query,
        setSort,
        querySum,
        handleColorChange,
        handleTypeChange
    };
}
