import { HStack, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { handlePrevPage, handleNextPage, handleRenderPageNumbers } from './paginateFunc'
import React from 'react';

export function Pagination( { currentPage, totalPages, onPageChange } ) {
    
    const prevPage = () => handlePrevPage( currentPage, onPageChange );
    const nextPage = () => handleNextPage( currentPage, totalPages, onPageChange )
    const renderPageNumbers = () => handleRenderPageNumbers( currentPage, totalPages, onPageChange )

    return (
        <div className="pagination">
            <HStack spacing={2} align="center" mt={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={prevPage}
                    isDisabled={currentPage === 1}
                    borderRadius="full"
                />
                {renderPageNumbers()}
                <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={nextPage}
                    isDisabled={currentPage === totalPages}
                    borderRadius="full"
                />
            </HStack>
        </div>
    );
}
