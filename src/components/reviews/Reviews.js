import React from 'react';
import './css/reviews.css'

const Reviews = ({reviews}) => {


    return(
        <div className="reviews">
            {
                reviews.map((review, i) =>{
                return(
                    <div className="review" key={i}>
                        <div className="stars">
                            {Array(review.rating).fill(1).map((star, j) => {
                                return <i className="material-icons" key={j}>star</i>
                            })}
                        </div>
                        <p>name: {review.author_name}</p>
                        <p>Review: {review.text}</p>
                        <p>Time: {review.relative_time_description}</p>
                        <hr />
                    </div>
                );
            })
            }
        </div>
    );
}

export default Reviews;