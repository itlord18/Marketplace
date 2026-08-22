"use client"

import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface BackButtonProps extends Partial<IconButtonProps> {
    onBack?: () => void;
}

export function BackButton({ onBack, ...props }: BackButtonProps) {
    return (
        <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            onClick={onBack}
            variant="ghost"
            size="lg"
            {...props}
        />
    )
}