import {PropTypes, default as React} from 'react'

const IngredientsList = (props) => {
	const renderIngredient = (ingredient, i) => {
		let icon = <i className="fa fa-check"></i>
		let key = 'ingredient-' + i

		return <div className="ingredient" key={ key }> 
			<div className="ingredientIcon">{ icon }</div>
			<div className="ingredientText">{ ingredient.name }</div>
		</div>
	}

	return <div className="IngredientsList">{ props.ingredients.map(renderIngredient) }</div>
}

IngredientsList.propTypes = {
	ingredients: PropTypes.array.isRequired
}

export default IngredientsList