import {PropTypes, default as React} from 'react'

const IngredientsList = (props) => {
	const {editing} = props

	const renderIngredient = (ingredient, i) => {
		let icon = <i className="fa fa-check"></i>
		let key = 'ingredient-' + i

		let ingredientContent = null

		if (ingredient.isButton) {
			ingredientContent = <button className="btn" onClick={props.onAdd}><i className="fa fa-plus"></i>  { ingredient.name }</button>
		} else if (editing) {
			ingredientContent = <input value={ ingredient.name } onChange={ (event) => props.onChange(i, event.target.value) } />
		} else {
			ingredientContent = <div className="ingredientText">{ ingredient.name }</div>
		}

		return <div className="ingredient" key={ key }>{ ingredientContent }</div>
	}

	let ingredients = props.ingredients.slice(0)
	console.log("Ingredients!")
	console.log(ingredients)

	if (editing) {
		ingredients.push({ name: 'Add Ingredient', isButton: true })
	}

	// [{name: '1/2 cup of blah'},{name: '123'}, {name: 'Add Ingredient', type: 'button'}]
	
	return <div className="IngredientsList">{ ingredients.map(renderIngredient) }</div>
}

IngredientsList.defaultProps = {
	editing: false
}

IngredientsList.propTypes = {
	ingredients: PropTypes.array.isRequired
}

export default IngredientsList