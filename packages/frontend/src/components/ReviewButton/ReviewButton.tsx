import React from 'react'
import { ThemedButton } from '../ThemedButton'

export const ReviewButton = ({
    onClick,
}: {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => (
    <ThemedButton onClick={onClick} style={{ width: 'auto' }}>
        Review
    </ThemedButton>
)
