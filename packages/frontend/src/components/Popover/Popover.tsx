import { createPortal } from 'react-dom'
import {
    AnimatePresence,
    domAnimation,
    LazyMotion,
    m,
    useReducedMotion,
} from 'framer-motion'
import './Popover.css'
import { ReactNode } from 'react'

export const Popover = ({
    position,
    visible,
    handleClose,
    children,
}: {
    position: {
        top: number
        left: number
    }
    visible: boolean
    handleClose: () => void
    children: ReactNode
}) => {
    return createPortal(
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {visible ? (
                    <>
                        <m.div
                            className="popover-overlay"
                            onClick={() => handleClose()}
                        ></m.div>
                        <m.div
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            className="popover-container"
                            style={{ ...position }}
                        >
                            {children}
                        </m.div>
                    </>
                ) : null}
            </AnimatePresence>
        </LazyMotion>,
        document.body
    )
}
