import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import './ThemedButton.css'

export const ThemedButton = ({
    children,
    ...props
}: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) => (
    <button className="themedButton" {...props}>
        {children}
    </button>
)
