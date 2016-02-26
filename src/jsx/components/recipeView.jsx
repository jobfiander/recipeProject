import {Component, default as React} from 'react'
import RatingControl from './ratingControl.jsx'
import IngredientsList from './ingredientsList.jsx'

class RecipeView extends Component {
	constructor(props) {
		super(props)
		
		this.close = () => this._close()
		this.handleChange = (event) => this._handleChange(event)
		this.handleRating = (rating) => this._handleRating(rating)
	}

	dispatch(action) {
		this.props.store.dispatch(action)
	}

	_close() {
		this.dispatch({type: 'CLOSE_RECIPE'})
	}

	_handleChange(event) {
		const {target} = event
		const key = target.getAttribute('data-key')

		let update = {}
		update[key] = event.target.value

		this.dispatch({type: 'UPDATE_RECIPE', index: this.props.recipeIndex, update})
	}

	_handleRating(rating) {
		this.dispatch({type: 'RATE_RECIPE', index: this.props.recipeIndex, rating})
	}

	render() {
		const {recipe} = this.props
		const {ingredients} = recipe

		return <div className="recipeView">
			<img src={ recipe.image } />
			<h1>{ recipe.name }</h1>
			<input value={ recipe.name } data-key="name" onChange={ this.handleChange } />
			<RatingControl value={ recipe.rating } onChange={this.handleRating}/>
			<h2>Prep Time: { recipe.prepTime } minutes</h2>
			<input value={ recipe.prepTime } data-key="prepTime" onChange={ this.handleChange } />

			<div className='recipeDirections'>{recipe.directions}</div>
			<IngredientsList ingredients={ingredients || []}/>
			<div className="closeButton" onClick={ this.close }><i className="fa fa-times fa-2x"></i></div>
		</div>
	}
}

export default RecipeView