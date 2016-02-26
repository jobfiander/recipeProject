import React from 'react'
import _ from 'underscore'

const Star = (props) => {
	const className = "fa " + ((props.active) ? "fa-star" : "fa-star-o")
	return <i className={ className } onClick={ (event) => props.onClick(props.value) }/>
}

const RatingControl = (props) => {
	let stars = _.range(props.maxValue).map((i) => {
		const key = "star-" + i
		
		return <Star active={ (i < props.value) } key={ key } value={ i + 1 } onClick={ (rating) => props.onChange(rating) } />
	})

	return <div className="rating-control">{ stars }</div>
}

RatingControl.defaultProps = {
	maxValue: 5,
	value: 0
}

export default RatingControl