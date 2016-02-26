import React from 'react'
import RatingControl from './ratingControl.jsx'
import ClassNames from 'classnames'

const RecipeListItem = (props) => {
	const {recipe, index, onOpen, onRate, onHeart} = props
	const heartClassName = ClassNames('heart', { full: recipe.loved })

	return <div className="recipeListItem">
		<div className="recipeListItemImage" style={{backgroundImage: "url('" + recipe.image + "')"}}>
			<div className={ heartClassName } onClick={ (event) => onHeart(index) } />
		</div>
		<div className="recipeListItemInfo">
			<RatingControl value={ recipe.rating } onChange={ (rating) => onRate(index, rating) } />
			<h2 onClick={ () => onOpen(index) }>{ recipe.name }</h2>
			<div className="categories"> {recipe.category} </div>
			<div className="serving"> {recipe.servingSize} </div>
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

	const heartItem = (index) => {
		props.store.dispatch({ type: 'LOVE_RECIPE', index })
	}

	const renderRecipeListItem = (recipe, index) => {
		const key = 'recipe-' + recipe.id
		return <RecipeListItem recipe={ recipe } key={ key } index={ index } onOpen={ openItem } onHeart={ heartItem } onRate={ rateItem }/>
	}

	const revert = () => {
		props.store.dispatch({ type: 'REVERT_DATA' })
	}

	return (
		<div className="recipeBrowser">
			<div className="recipeCategories"><button onClick={ revert }>Revert Data</button></div>
			<div className="recipeList">{ props.items.map(renderRecipeListItem) }</div>
		</div>
	)
}

export default RecipeList