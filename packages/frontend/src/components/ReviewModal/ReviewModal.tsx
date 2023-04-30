import './ReviewModal.css'
import { Popover } from '../Popover'
import { Star } from '../../icons'
import { useState, useContext } from 'react'
import User from '../../contexts/User'
import { ThemedButton } from '../ThemedButton'

export const ReviewModal = ({
    position,
    visible,
    handleClose,
    handleReviewSubmitted,
    currentProduct,
}: {
    position: { top: number; left: number }
    visible: boolean
    handleClose: () => void
    handleReviewSubmitted: (review: number) => void
    currentProduct?: string
}) => {
    const userContext = useContext(User)
    const [buttonText, setButtonText] = useState<string | undefined>()
    const [review, setReview] = useState(0)
    const [reqInfo, setReqInfo] = useState<{
        nonce: number
    }>({ nonce: 0 })

    const onHoverStar = (score: number) => {
        setReview(score)
    }
    const handleSubmit = async () => {
        if (!userContext.hasSignedUp) {
            setButtonText('Signing up...')
            console.log('Signing up')
            await userContext.signup()
        }
        const needsTransition =
            userContext.userState &&
            userContext.userState.sync.calcCurrentEpoch() !==
                (await userContext.userState.latestTransitionedEpoch())
        console.log('Needs transition', needsTransition)
        if (needsTransition) {
            console.log('Transitioning')
            setButtonText('Transitioning...')
            await userContext.stateTransition()
        }
        console.log('Requesting data')
        setButtonText('Requesting data...')
        // TODO: More reputation for users that have bought the products
        // TODO: hash products reviewed
        await userContext.requestData(
            {
                0: 1,
                1: currentProduct?.split('product:')[0] || '7610522796088',
            },
            reqInfo.nonce ?? 0
        )
        console.log('review', review)
        handleReviewSubmitted(review)
        setReview(0)
        handleClose()
        setButtonText(undefined)
    }
    return (
        <Popover
            visible={visible}
            handleClose={handleClose}
            position={position}
        >
            <div className="reviewModal-container">
                <div>
                    {[...Array(5).keys()].map((index) => (
                        <button
                            className="reviewModal-starButton"
                            onMouseEnter={() => onHoverStar(index + 1)}
                            key={index}
                        >
                            <Star
                                fill={index < review ? '#f7bd2b' : '#d5d5d5'}
                                size={20}
                            />
                        </button>
                    ))}
                </div>
                <ThemedButton
                    onClick={handleSubmit}
                    disabled={Boolean(buttonText)}
                >
                    {buttonText || 'Submit'}
                </ThemedButton>
                <p className="reviewModal-poweredBy">
                    Powered by
                    <img
                        src={require('../../../public/logo.svg')}
                        alt="UniRep logo"
                        width={80}
                    />
                </p>
            </div>
        </Popover>
    )
}
