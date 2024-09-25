import { HStack, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {usePrevPage,useRenderPageNumbers,useNextPage} from './usePagination'

export function Pagination({ currentPage, totalPages, onPageChange }) {
    

    return (
        <div className="pagination">
            <HStack spacing={2} align="center" mt={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={usePrevPage(currentPage, onPageChange)}
                    isDisabled={currentPage === 1}
                    borderRadius="full"
                />
                {useRenderPageNumbers(currentPage, totalPages, onPageChange)}
                <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={useNextPage(currentPage, totalPages, onPageChange)}
                    isDisabled={currentPage === totalPages}
                    borderRadius="full"
                />
            </HStack>
        </div>
    );
}
