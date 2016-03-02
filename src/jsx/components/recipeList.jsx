import React from 'react'
import RatingControl from './ratingControl.jsx'
import ClassNames from 'classnames'

const RecipeListItem = (props) => {
	const {recipe, onOpen, onRate, onHeart} = props
	const heartClassName = ClassNames('heart', { full: recipe.loved })

	return <div className="recipeListItem">
		<div className="recipeListItemImage" style={{backgroundImage: "url('" + recipe.image + "')"}}>
			<img src={ recipe.image } style={{display:'none'}}/>
			<div className={ heartClassName } onClick={ (event) => onHeart(recipe.id) } />
		</div>
		<div className="recipeListItemInfo">
			<RatingControl value={ recipe.rating } onChange={ (rating) => onRate(recipe.id, rating) } />
			<h2 onClick={ () => onOpen(recipe.id) }>{ recipe.name }</h2>
			<div className="categories"> {recipe.category} </div>
			<div className="prepTime"> {recipe.prepTime} Min </div>
			<div className="serving"> {recipe.servingSize} </div>

		</div>
	</div>
}

const RecipeList = (props) => {
	console.log("Props")
	console.log(props)

	const rateItem = (id, rating) => {
		// Handle star toggle (click full star and it empties)
		// if (props.items[index].rating === rating) {
		// 	rating = rating - 1
		// }
		
		props.onRate(id, rating)
	}

	const renderRecipeListItem = (recipe, index) => {
		const key = 'recipe-' + recipe.id
		return <RecipeListItem recipe={ recipe } key={ key } onOpen={ props.onOpen } onHeart={ props.onLove } onRate={ rateItem }/>
	}

	return (
		<div className="recipeBrowser">
			<div className="recipeList">{ props.items.map(renderRecipeListItem) }</div>
		</div>
	)
}

export default RecipeList