import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ProductRatingScore } from '../ProductRatingScore'
import { ReviewButton } from '../ReviewButton'
import { ReviewModal } from '../ReviewModal'
import { ClaimButton } from '../ClaimButton'
import './ProductRating.css'
import User from '../../contexts/User'

export const ProductRating = observer(() => {
    const [currentProduct, setCurrentProduct] = useState('')
    const [showReviewButton, setShowReviewButton] = useState(false)
    const [reviewsCount, setReviewsCount] = useState(1)
    const [scoreSum, setScoreSum] = useState(5)
    const userContext = useContext(User)
    const [modalVisible, setModalVisible] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    console.log(currentProduct)

    useEffect(() => {
        const interval = setInterval(() => {
            setShowReviewButton(
                `product:${Number(userContext.data[1])}` !== currentProduct
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [userContext.data[1], currentProduct])

    useEffect(() => {
        window.onmessage = function (e) {
            if (
                typeof e.data === 'string' &&
                e.data.startsWith('product:') &&
                currentProduct !== e.data
            ) {
                setCurrentProduct(e.data)
                const productReviewsCount = window.localStorage.getItem(
                    `${e.data}-reviewsCount`
                )
                if (productReviewsCount) {
                    setReviewsCount(parseInt(productReviewsCount))
                }
                const productScoreSum = window.localStorage.getItem(
                    `${e.data}-scoreSum`
                )
                if (productScoreSum) {
                    setScoreSum(parseInt(productScoreSum))
                }
                console.log(
                    '🍉-window.onmessage',
                    productReviewsCount,
                    productScoreSum
                )
            }
        }
    }, [currentProduct])
    console.log('🍉', currentProduct, reviewsCount, scoreSum)

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (el) => {
        if (!userContext.userState && !userContext.hasSignedUp) {
            userContext.signup()
        }

        setPosition({ top: el.clientY, left: el.clientX - 220 })
        setModalVisible(true)
    }
    const handleReviewSubmitted = (review: number) => {
        setReviewsCount((prevCount) => {
            const newCount = prevCount + 1
            window.localStorage.setItem(
                `${currentProduct}-reviewsCount`,
                `${newCount}`
            )
            return newCount
        })
        setScoreSum((prevSum) => {
            const newSum = prevSum + review
            window.localStorage.setItem(
                `${currentProduct}-scoreSum`,
                `${newSum}`
            )
            return newSum
        })
        setShowReviewButton(false)
    }

    return (
        <div className="productRating">
            <div className="productRating-container">
                <ProductRatingScore
                    reviewsCount={reviewsCount}
                    scoreSum={scoreSum}
                />
                {showReviewButton ? <ReviewButton onClick={onClick} /> : null}
                <ReviewModal
                    position={position}
                    visible={modalVisible}
                    handleClose={() => setModalVisible(false)}
                    handleReviewSubmitted={handleReviewSubmitted}
                    currentProduct={currentProduct}
                />
            </div>
            <ClaimButton />
        </div>
    )
})
