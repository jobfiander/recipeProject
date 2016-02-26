import {Component, default as React} from 'react'
import RatingControl from './ratingControl.jsx'
import IngredientsList from './ingredientsList.jsx'

const RecipeView = (props) => {
	const {recipe} = props
	const {ingredients} = recipe
	const {index} = props

	const handleChange = (event) => {
		const {target} = event
		const key = target.getAttribute('data-key')

		let update = {}
		update[key] = event.target.value

		props.store.dispatch({type: 'UPDATE_RECIPE', index, update})
	}

	const handleRating = (rating) => {
		props.store.dispatch({type: 'RATE_RECIPE', index, rating})
	}

	const close = (event) => {
		props.store.dispatch({type: 'CLOSE_RECIPE'})
	}

	return <div className="recipeView">
		<img src={ recipe.image } />
		<h1>{ recipe.name }</h1>
		<input value={ recipe.name } data-key="name" onChange={ handleChange } />
		<RatingControl value={ recipe.rating } onChange={ handleRating }/>
		<h2>Prep Time: { recipe.prepTime } minutes</h2>
		<input value={ recipe.prepTime } data-key="prepTime" onChange={ handleChange } />
		
		<div className='recipeDirections'>{ recipe.directions }</div>
		<IngredientsList ingredients={ ingredients || [] }/>
		<div className="closeButton" onClick={ close }><i className="fa fa-times fa-2x"></i></div>
	</div>
}

export default RecipeView