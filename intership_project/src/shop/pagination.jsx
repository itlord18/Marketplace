import { HStack, Button, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

export function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        
        const startPage = Math.max(currentPage - 2, 1); 
        const endPage = Math.min(currentPage + 5, totalPages); 

        if (startPage > 1) {
            pageNumbers.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "solid" : "outline"}
                    onClick={() => onPageChange(1)}
                    borderRadius="full"
                    size="sm"
                >
                    1
                </Button>
            );
            if (startPage > 2) {
                pageNumbers.push(<Button key="dots-left" borderRadius="full">...</Button>);
            }
        }

        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "solid" : "outline"}
                    onClick={() => onPageChange(i)}
                    borderRadius="full"
                    size="sm"
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<Button key="dots-right" borderRadius="full">...</Button>);
            }
            pageNumbers.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "solid" : "outline"}
                    onClick={() => onPageChange(totalPages)}
                    borderRadius="full"
                    size="sm"
                >
                    {totalPages}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <HStack spacing={2} align="center" mt={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={handlePrevPage}
                    isDisabled={currentPage === 1}
                    borderRadius="full"
                />
                {renderPageNumbers()}
                <IconButton
                    icon={<ArrowForwardIcon />}
                    onClick={handleNextPage}
                    isDisabled={currentPage === totalPages}
                    borderRadius="full"
                />
            </HStack>
        </div>
    );
}
