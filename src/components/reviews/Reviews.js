
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
                            <p>Rating: </p>{Array(review.rating).fill(1).map((star, j) => {
                                return <i className="material-icons" key={j}>star</i>
                            })}
                        </div>
                        <p>Review: </p><div id="review">{review.text}</div>
                        <p>Time: </p><div id="time">{review.relative_time_description}</div>
                        <hr />
                    </div>
                );
            })
            }
        </div>
    );
}

export default Reviews;