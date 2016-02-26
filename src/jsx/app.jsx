import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import ClassNames from 'classnames'
import {Map, List, fromJS} from 'immutable'
import {createStore} from 'redux'

const recipes = List([
	Map({
		id: 1,
		name: 'Sushi',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-8.jpg',
		prepTime: 60,
		rating: 2
	}),
	Map({
		id: 2,
		name: 'Hamburger',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-9.jpg',
		prepTime: 15,
		rating: 4,
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.'
	}),
	Map({
		id: 3,
		name: 'Stir Fry',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-6.jpg',
		prepTime: 20,
		rating: 3
	})
])

function handleAction(state, action) {
	switch (action.type) {
		case 'OPEN_RECIPE':
			return state.set('selectedItem', action.index)

		case 'CLOSE_RECIPE':
			return state.set('selectedItem', -1)

		case 'RATE_RECIPE':
			return state.update('items', items => {
				return items.update(action.index, item => {
					return item.set('rating', action.rating)
				})
			})

		case 'UPDATE_RECIPE_NAME':
			return state.update('items', items => {
				return items.update(action.index, item => {
					return item.set('name', action.name)
				})
			})
		
		default:
			return state
	}
}

class RatingControl extends Component {
	constructor(props) {
		super(props)
	}

	clickHandler(index) {
		return (event) => {
			this.props.onChange(index + 1)
		}
	}

	render() {
		let stars = []

		for (let i = 0; i < this.props.maxValue; i++) {
			let key = "star-" + i
			let className = "fa fa-star-o"

			if (i < this.props.value) {
				className = "fa fa-star"
			}

			stars.push(<i className={ className } onClick={ this.clickHandler(i) } key={key} />)
		}

		return <div className="rating-control">{ stars }</div>
	}
}

// localStorage.removeItem('SAVED_STATE')

RatingControl.defaultProps = {
	maxValue: 5,
	value: 2
}

const savedJSONData = localStorage.getItem('SAVED_STATE')
let initialData = null

if (savedJSONData) {
	initialData = fromJS(JSON.parse(savedJSONData))
} else {
	initialData = Map({ items: recipes, selectedItem: -1})
}

const store = createStore(handleAction, initialData)

store.subscribe(() => {
	console.log("Store updated")

	let saveState = store.getState().toJS()
		// console.log(saveState)
	localStorage.setItem('SAVED_STATE', JSON.stringify(saveState))
	// localStorage.set('')
})

class RecipeList extends Component {
	constructor(props) {
		super(props)

		//this.handleClick = (index) => this._handleClick(index)
		// this.handleRating = (rating) => this._handleRating(index)

		// this.state = this.props.store.getState()
	}

	handleClick(index) {
		return (event) => {
			console.log("Open")
			store.dispatch({ type: 'OPEN_RECIPE', index: index })
		}
	}

	handleRating(index) {
		return (rating) => {
			store.dispatch({ type: 'RATE_RECIPE', index: index, rating: rating })
		}
	}

	render() {
		const renderRecipeListItem = (recipeMap, index) => {
			let recipe = recipeMap.toObject()
			let key = 'recipe-' + recipe.id

			return <div className="recipeListItem" key={ key }>
				<div className="recipeListItemImage" style={{backgroundImage: "url('" + recipe.image + "')"}}>
					<div className="fade">
						<h2 onClick={ this.handleClick(index) }>{ recipe.name }</h2>
						<RatingControl value={ recipe.rating } onChange={ this.handleRating(index) } />
					</div>
				</div>
			</div>
		}

		return (
			<div className="recipeList">
				{ this.props.items.map(renderRecipeListItem) }
			</div>
		)
	}
}

const ingredients = [
	{
		name: '2 pounds ground beef sirloin',
		listed: false
	},
	{
		name: '1/2 onion, grated',
		listed: false
	},
	{
		name: '1 tablespoon grill seasoning',
		listed: false
	},
	{
		name: '1 tablespoon liquid smoke flavoring',
		listed: false
	},
	{
		name: '2 tablespoons Worcestershire sauce',
		listed: false
	},
	{
		name: '2 tablespoons minced garlic',
		listed: false
	},
	{
		name: '1 tablespoon adobo sauce from canned chipotle peppers',
		listed: false
	},
	{
		name: '1 chipotle chile in adobo sauce, chopped',
		listed: false
	},
	{
		name: 'salt and pepper to taste',
		listed: false
	},
	{
		name: '6 (1 ounce) slices sharp Cheddar cheese (optional)',
		listed: false
	},
	{
		name: '6 hamburger buns',
		listed: false
	},
]

class IngredientsList extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const renderIngredient=(ingredient, i) => {
			let icon= <i className="fa fa-check"></i>

			return <div className="ingredient"> 
				<div className="ingredientIcon">{icon}</div>
				<div className="ingredientText">{ingredient.name}</div>
			</div>
		}
		return <div className="IngredientsList"> {this.props.ingredients.map(renderIngredient)} </div>
	}
}

class RecipeView extends Component {
	constructor(props) {
		super(props)
		// this.handleClick = (index) => this._handleClick(index)

		// this.state = {
		// 	recipe: store.get('items')[store.get('selectedItem')]
		// }

		this.close = () => this._close()
		this.handleChange = (event) => this._handleChange(event)
		this.handleRating = (rating) => this._handleRating(rating)
	}

	_close() {
		store.dispatch({type: 'CLOSE_RECIPE'})
	}

	_handleChange(event) {
		console.log("Change")
		console.log(event.target.value)

		store.dispatch({type: 'UPDATE_RECIPE_NAME', index: this.props.recipeIndex, name: event.target.value})
	}

	_handleRating(rating) {
		store.dispatch({type: 'RATE_RECIPE', index: this.props.recipeIndex, rating})
	}

	render() {
		let {recipe} = this.props

		return <div className="recipeView">
			<img src={ recipe.image } />
			<h1>{ recipe.name }</h1>
			<RatingControl value={ recipe.rating } onChange={this.handleRating}/>
			<h2>Prep Time: { recipe.prepTime } minutes</h2>

			<div className='recipeDirections'>{recipe.directions}</div>
			<IngredientsList ingredients={ingredients}/>
			<div className="closeButton" onClick={ this.close }><i className="fa fa-times fa-2x"></i></div>
		</div>
	}
}

// <input type="text" value={ recipe.name } onChange={ this.handleChange } />

class App extends Component {
	constructor(props) {
		super(props)

		this.state = store.getState().toObject()

		this.handleRecipeClick = (index) => this._handleRecipeClick(index);
		this.closeRecipe = () => this._closeRecipe()
	}

	componentDidMount() {
		store.subscribe(() => {
			console.log("Update state")
			this.setState(store.getState().toObject())
		})
	}

	// _closeRecipe() {
	// 	this.setState({ selectedItem: -1 })
	// }

	render() {
		let content = null

		if (this.state.selectedItem >= 0) {
			let recipe = this.state.items.get(this.state.selectedItem).toObject()

			content = <RecipeView store={ store } recipe={ recipe } recipeIndex={ this.state.selectedItem } />
		} else {
			content = <RecipeList items={ this.state.items.toArray() }/>
		}

		return (
			<div id="content">
				{ content }
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('content'))