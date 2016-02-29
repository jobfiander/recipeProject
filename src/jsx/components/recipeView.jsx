import {Component, default as React} from 'react'
import RatingControl from './ratingControl.jsx'
import IngredientsList from './ingredientsList.jsx'
import ClassNames from 'classnames'

const RecipeView = (props) => {
	const {recipe} = props
	const {ingredients} = recipe
	const {index} = props
	const heartClassName = ClassNames('heart', { full: recipe.loved })

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
		<img src={ recipe.image }/>
		<div className={ heartClassName } onClick={ (event) => onHeart(index) } />
		<RatingControl value={ recipe.rating } onChange={ handleRating }/>
		<div className="label"> Title </div>
		<input className="recipeName" value={ recipe.name } data-key="name" onChange={ handleChange } />
		<div className="label"> Category </div>
		<input className="recipeField" value={ recipe.category } data-key="name" onChange={ handleChange } />
		<div className="label"> Prep Time </div>
		<input className="recipeField" value={ recipe.prepTime+' Minutes' } data-key="prepTime" onChange={ handleChange } />
		<div className="recipeContent">
			<div className="serving"> Serves {recipe.servingSize} </div>
			<div className='ingredientsContainer'>
				<h2> Ingredients </h2>
				<IngredientsList ingredients={ ingredients || [] }/>
			</div>

			<div className='recipeDirections'><h2> Directions </h2>{ recipe.directions }</div>
		</div>
		<div className="closeButton" onClick={ close }><i className="fa fa-times fa-2x"></i></div>
	</div>

}

export default RecipeView