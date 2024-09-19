import { HStack, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {handlePrevPage,handleNextPage,renderPageNumbers} from './usePagination'

export function Pagination({ currentPage, totalPages, onPageChange }) {
    

    return (
        <div className="pagination">
            <HStack spacing={2} align="center" mt={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={handlePrevPage(currentPage, onPageChange)}
                    isDisabled={currentPage === 1}
                    borderRadius="full"
                />
                {renderPageNumbers(currentPage, totalPages, onPageChange)}
                <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={handleNextPage(currentPage, totalPages, onPageChange)}
                    isDisabled={currentPage === totalPages}
                    borderRadius="full"
                />
            </HStack>
        </div>
    );
}
