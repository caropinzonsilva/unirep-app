import './ClaimButton'
import { useContext, useEffect } from 'react'
import User from '../../contexts/User'
import { useState } from 'react'
import { ThemedButton } from '../ThemedButton'

const rewards = [1, 5, 10]

export const ClaimButton = () => {
    const userContext = useContext(User)
    const [data, setData] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setData(Number(userContext.data[0]))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (data >= 1) {
            window.top?.postMessage('hello', '*')
        }
    }, [data])

    if (!rewards.includes(data)) {
        return null
    }

    return null
}
