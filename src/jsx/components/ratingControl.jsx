import React from 'react'

const RatingControl = (props) => {
	let stars = []

	for (let i = 0; i < props.maxValue; i++) {
		const key = "star-" + i
		const className = "fa " + ((i < props.value) ? "fa-star" : "fa-star-o")
		stars.push(<i className={ className } data-rating={ i + 1 } onClick={ (event) => props.onChange(event.target.getAttribute('data-rating')) } key={key} />)
	}

	return <div className="rating-control">{ stars }</div>
}

RatingControl.defaultProps = {
	maxValue: 5,
	value: 0
}

export default RatingControl