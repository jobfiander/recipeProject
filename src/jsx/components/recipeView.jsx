import {Component, default as React} from 'react'
import RatingControl from './ratingControl.jsx'
import IngredientsList from './ingredientsList.jsx'
import ClassNames from 'classnames'

const RecipeView = (props) => {
	const {recipe} = props
	console.log("Recipe")
	console.log(recipe)
	const {ingredients, id} = recipe
	const heartClassName = ClassNames('heart', { full: recipe.loved })

	const handleChange = (event) => {
		const {target} = event
		const key = target.getAttribute('data-key')
		
		let update = {}
		update[key] = event.target.value
		
		props.store.dispatch({type: 'UPDATE_RECIPE', id, update})
	}

	const handleRating = (rating) => {
		console.log("Handle rating")
		console.log(id)
		props.store.dispatch({type: 'RATE_RECIPE', id, rating})
	}

	const close = (event) => {
		props.store.dispatch({type: 'CLOSE_RECIPE'})
	}

	const handleAddIngredient = () => {
		console.log("Handle add ingredient")
		console.log(id)

		props.store.dispatch({type: 'ADD_INGREDIENT', id})
	}

	const handleEditIngredient = (index, value) => {
		props.store.dispatch({type: 'EDIT_INGREDIENT', index, value, id})
	}

	const handleEditToggle = (key) => {
		props.store.dispatch({type: 'CLEAR_EMPTY_INGREDIENTS', id})

		props.onEdit(key)
	}

	console.log("Edit map")
	
	let editMap = {
		directions: false,
		ingredients: false
	}

	if (props.editMap) {
		editMap = props.editMap
	}

	let directionsView = null

	if (editMap.directions) {
		directionsView = <div className="textWrapper"><textarea value={ recipe.directions } data-key="directions" onChange={ handleChange}/></div>
	} else {
		directionsView = <div className='recipeDirections'>{ recipe.directions }</div>
	}

	const directionsPencilClass = ClassNames('fa', 'fa-pencil', {active: editMap.directions})
	const ingredientsPencilClass = ClassNames('fa', 'fa-pencil', {active: editMap.ingredients})

	return <div className='recipeContainer'>
		<div className="recipeView">	
			<div className="closeButton" onClick={ close }><i className="fa fa-chevron-circle-left"></i> Go Back</div>
			<div className="recipeIntro">
				<div className="recipeForm">
					<div className={ heartClassName } onClick={ (event) => onHeart(id) } />
					<div className="ratingContainer">Your Rating: <RatingControl value={ recipe.rating } onChange={ handleRating }/> </div>
					<div className="label">Title</div>
					<input className="recipeName" value={ recipe.name } data-key="name" onChange={ handleChange } />
					<div className="label">Category</div>
					<input className="recipeField" value={ recipe.category } data-key="category" onChange={ handleChange } />
					<div className="label">Prep Time</div>
					<input className="recipeField" value={ recipe.prepTime } data-key="prepTime" onChange={ handleChange } />
				</div>
				<div className="recipePhoto"> 
					<img src={ recipe.image }/> 
					<div className="recipeDetails">
						<div className="serving">Serves {recipe.servingSize}</div>
					</div>
				</div>
			</div>

			

			<div className="recipeContent">
				<div className='ingredientsContainer'>
					<h2>Ingredients </h2> 
					<i className={ingredientsPencilClass} onClick={ () => handleEditToggle('ingredients') }></i>
					<IngredientsList onAdd={ handleAddIngredient } onChange={ handleEditIngredient } editing={ editMap.ingredients } ingredients={ ingredients || [] }/>
				</div>
					<div className='directionsContainer'>
					<h2>Directions</h2>
					<i className={directionsPencilClass} onClick={ () => handleEditToggle('directions') }></i>
					{ directionsView }
				</div>
			</div>
		</div>
	</div>

}

export default RecipeView