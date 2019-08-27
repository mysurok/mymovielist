import React from 'react'

import './Rating.scss'

const STARS = "★★★★★★★★★★"

const getRatingClassName = (rating, index) => {
    if ( rating >= index ) {
        return "full"
    } else {
        if ( index > rating && index - 1 < rating) {
            return "half"
        } else {
            return "empty"
        }
    }
}
export const Rating = ({ rating, count, popularity }) => (
    <span className="rating">
        { STARS.split("").map((star, index) => (
            <span key={index} className={getRatingClassName(rating, index + 1)}> {star} </span>
        ))}
        <span className="details">
            { rating } ({ count })
        </span>
        { popularity && <span className="item">
            <span className="name">{ popularity.name }:</span>
            <span className="value">{ popularity.count }</span>
        </span> }
    </span>
)
