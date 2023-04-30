import './ProductRatingScore.css'
import { Star } from '../../icons'

export const ProductRatingScore = ({
    scoreSum,
    reviewsCount,
}: {
    scoreSum: number
    reviewsCount: number
}) => {
    const score = scoreSum / reviewsCount
    return (
        <div className="productRatingScore-container">
            <p className="productRatingScore-score">{score.toFixed(1)}</p>
            <div className="productRatingScore-starAndReviews">
                <div className="productRatingScore-stars">
                    {[...Array(5).keys()].map((index) => (
                        <Star
                            fill={index < score ? '#f7bd2b' : '#d5d5d5'}
                            size={20}
                            key={index}
                        />
                    ))}
                </div>
                <p className="productRatingScore-reviews">
                    ({reviewsCount} {reviewsCount > 1 ? 'reviews' : 'review'})
                </p>
            </div>
        </div>
    )
}
