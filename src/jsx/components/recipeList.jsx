import React from 'react'
import RatingControl from './ratingControl.jsx'

const RecipeListItem = (props) => {
	const {recipe, index, onOpen, onRate} = props

	return <div className="recipeListItem">
		<div className="recipeListItemImage" style={{backgroundImage: "url('" + recipe.image + "')"}}>
			<div className="fade">
				<h2 onClick={ () => onOpen(index) }>{ recipe.name }</h2>
				<RatingControl value={ recipe.rating } onChange={ (rating) => onRate(index, rating) } />
			</div>
		</div>
	</div>
}

const RecipeList = (props) => {
	const openItem = (index) => {
		props.store.dispatch({ type: 'OPEN_RECIPE', index })
	}

	const rateItem = (index, rating) => {
		props.store.dispatch({ type: 'RATE_RECIPE', index, rating })
	}

	const renderRecipeListItem = (recipe, index) => {
		const key = 'recipe-' + recipe.id
		return <RecipeListItem recipe={ recipe } key={ key } index={ index } onOpen={ openItem } onRate={ rateItem }/>
	}

	return <div className="recipeList">{ props.items.map(renderRecipeListItem) }</div>
}

export default RecipeList