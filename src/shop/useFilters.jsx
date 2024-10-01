import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useFilters() {
    const [ selectedColors, setSelectedColors ] = useState( [] );
    const [ selectedTypes, setSelectedTypes ] = useState( [] );
    const [ sort, setSort ] = useState( '' );
    const [ query, setQuery ] = useState( '' );
    const itemsPerPage = 3;
    const [ currentPage, setCurrentPage ] = useState( 1 );

    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        const params = new URLSearchParams( location.search );

        const page = parseInt( params.get( 'page' ) ) || 1;
        setCurrentPage( page );

        const colors = params.get( 'color_like' );
        if ( colors ) {
            setSelectedColors( colors.split( '|' ) );
        }

        const types = params.get( 'type_like' );
        if ( types ) {
            setSelectedTypes( types.split( '|' ) );
        }

        const orderParam = params.get( '_order' );
        const sortParam = params.get( '_sort' );
        if ( sortParam ) {
            setSort( '_sort='+ sortParam + '&_order=' + orderParam );
        }

    }, [ location.search ] );

    useEffect( () => {
        let prevQuery = '';

        if ( selectedTypes.length > 0 ) {
            prevQuery += `type_like=${selectedTypes.join( '|' )}&`;
        }

        if ( selectedColors.length > 0 ) {
            prevQuery += `color_like=${selectedColors.join( '|' )}&`;
        }

        if ( sort ) {
            prevQuery += `${sort}&`;
        }

        if ( currentPage > 1 ) {
            prevQuery += `page=${currentPage}&`;
        }

        prevQuery = prevQuery.slice( 0, -1 );

        if ( prevQuery !== query ) {
            setQuery( prevQuery );
            navigate( { search: prevQuery } );
        }
    }, [ selectedColors, selectedTypes, sort, currentPage, query, navigate ] );

    const handlePageChange = ( page ) => {
        if ( page !== currentPage ) {
            setCurrentPage( page );
        }
    };



    const handleElementChange = ( element, setState ) => {
        setState( ( prevElements ) => {
            const updatedElements = prevElements.includes( element )
                ? prevElements.filter( ( e ) => e !== element )
                : [ ...prevElements, element ];
            return updatedElements;
        } );
        setCurrentPage( 1 );
    };

    return {
        selectedColors,
        setSelectedColors,
        selectedTypes,
        setSelectedTypes,
        sort,
        query,
        setSort,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        handlePageChange,
        handleElementChange,
    };
}
