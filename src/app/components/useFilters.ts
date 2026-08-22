"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UseFiltersReturn {
    selectedColors: string[];
    setSelectedColors: (colors: string[] | ((prev: string[]) => string[])) => void;
    selectedTypes: string[];
    setSelectedTypes: (types: string[] | ((prev: string[]) => string[])) => void;
    sort: string;
    setSort: (sort: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    handleElementChange: (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => void;
    handlePageChange: (page: number) => void;
    setSelectedProductIdQuery: (id: number | null) => void;
    clearAllFilters: () => void;
    itemsPerPage: number;
}

export function useFilters(): UseFiltersReturn {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [selectedColors, setSelectedColorsState] = useState<string[]>(
        () => searchParams.get('colors')?.split(',') || []
    );
    const [selectedTypes, setSelectedTypesState] = useState<string[]>(
        () => searchParams.get('types')?.split(',') || []
    );
    const [sort, setSortState] = useState<string>(
        () => searchParams.get('sort') || ''
    );
    const [currentPage, setCurrentPageState] = useState<number>(
        () => parseInt(searchParams.get('page') || '1')
    );

    const isUpdating = useRef<boolean>(false);

    // Единая функция для обновления URL
    const updateURL = useCallback((newParams: Record<string, string | null>) => {
        // Защита от множественных вызовов
        if (isUpdating.current) {
            console.log('⏭️ Обновление уже выполняется');
            return;
        }

        isUpdating.current = true;

        const params = new URLSearchParams(searchParams.toString());
        
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const newQuery = params.toString();
        const currentQuery = searchParams.toString();
        
        if (newQuery !== currentQuery) {
            const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;
            router.push(newUrl);
        }

        setTimeout(() => {
            isUpdating.current = false;
        }, 100);
    }, [searchParams, pathname, router]);

    
    const setSelectedProductIdQuery = useCallback((id: number | null) => {
        updateURL({ productId: id?.toString() || null });
    }, [updateURL]);


    const setSelectedColors = useCallback((colors: string[] | ((prev: string[]) => string[])) => {
        const newColors = typeof colors === 'function' ? colors(selectedColors) : colors;
        setSelectedColorsState(newColors);
        updateURL({ colors: newColors.length > 0 ? newColors.join(',') : null });
    }, [selectedColors, updateURL]);

    const setSelectedTypes = useCallback((types: string[] | ((prev: string[]) => string[])) => {
        const newTypes = typeof types === 'function' ? types(selectedTypes) : types;
        setSelectedTypesState(newTypes);
        updateURL({ types: newTypes.length > 0 ? newTypes.join(',') : null });
    }, [selectedTypes, updateURL]);

    const setSort = useCallback((newSort: string) => {
        setSortState(newSort);
        updateURL({ sort: newSort || null });
    }, [updateURL]);

    const setCurrentPage = useCallback((page: number) => {
        setCurrentPageState(page);
        updateURL({ page: page > 1 ? page.toString() : null });
    }, [updateURL]);

    // Синхронизация из URL в state
    useEffect(() => {
        const colors = searchParams.get('colors')?.split(',') || [];
        const types = searchParams.get('types')?.split(',') || [];
        const sortParam = searchParams.get('sort') || '';
        const pageParam = parseInt(searchParams.get('page') || '1');

        if (JSON.stringify(colors) !== JSON.stringify(selectedColors)) {
            setSelectedColorsState(colors);
        }
        if (JSON.stringify(types) !== JSON.stringify(selectedTypes)) {
            setSelectedTypesState(types);
        }
        if (sortParam !== sort) {
            setSortState(sortParam);
        }
        if (pageParam !== currentPage) {
            setCurrentPageState(pageParam);
        }
    }, [currentPage, searchParams, selectedColors, selectedTypes, sort]);

    const handleElementChange = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter((prev: string[]) => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value);
            } else {
                return [...prev, value];
            }
        });
    }, []);

    const clearAllFilters = useCallback(() => {
        console.log('🧹 clearAllFilters: очищаем все параметры');
        // Сбрасываем состояния
        setSelectedColorsState([]);
        setSelectedTypesState([]);
        setSortState('');
        setCurrentPageState(1);
        
        // Очищаем URL
        const newUrl = pathname;
        router.push(newUrl);
    }, [pathname, router]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, [setCurrentPage]);

    const itemsPerPage = 3;

    return {
        selectedColors,
        setSelectedColors,
        selectedTypes,
        setSelectedTypes,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        handleElementChange,
        handlePageChange,
        setSelectedProductIdQuery, 
        clearAllFilters,
        itemsPerPage,
    };
}