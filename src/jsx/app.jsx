import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import store from './stores/recipeStore.js'
import ClassNames from 'classnames'
import _ from 'underscore'

import { Provider } from 'react-redux'
import { Map } from 'immutable'

import VisibleRecipeList from './components/visibleRecipeList.jsx'
import RecipeView from './components/recipeView.jsx'

store.subscribe(() => {
	// Save data
	localStorage.setItem('SAVED_STATE', JSON.stringify(store.getState().toJS()))
})

class App extends Component {
	constructor(props) {
		super(props)
		
		this.state = this.stateWithCategories(store.getState().toJS())
		this.handleRecipeEdit = (key) => this._handleRecipeEdit(key)
	}

	stateWithCategories(state) {
		console.log("State without categories")
		console.log(state)

		let items = _.values(state.items)

		state.categories = _.uniq(items.map(({category}) => category))

		console.log("With categories")
		console.log(state)

		return state
	}

	componentDidMount() {
		store.subscribe(() => {
			let newState = this.stateWithCategories(store.getState().toJS())
			this.setState(newState)
		})
	}

	_handleRecipeEdit(key) {
		store.dispatch({ type: 'TOGGLE_EDIT', key: key })
	}

	render() {
		console.log("Render app")
		
		let content = <VisibleRecipeList />

		if (this.state.selectedItem >= 0) {
			// const recipe = this.state.items[this.state.selectedItem]
			let items = store.getState().get('items')
			
			let recipe = items.get(this.state.selectedItem).toJS()
			recipe.id = this.state.selectedItem

			// for (let i = 0; i < this.state.items.length; i++) {
			// 	if (this.state.items[i].id === this.state.selectedItem) {
			// 		recipe = this.state.items[i]
			// 		break
			// 	}
			// }
			
			content = <RecipeView store={ store } editMap={ this.state.editMap } recipe={ recipe } onEdit={ this.handleRecipeEdit } />
		}

		const revert = () => {
			store.dispatch({ type: 'REVERT_DATA' })
		}

		const filters = [
			{
				filter: 'SHOW_ALL',
				title: 'All Recipes'
			},
			{
				filter: 'SHOW_LOVED',
				title: 'Loved'
			},
			{
				filter: 'SHOW_UNLOVED',
				title: 'Unloved'
			}
		]

		const renderFilter = ({filter, title}) => {
			const key = 'filter-' + filter
			const active = (filter === this.state.visibilityFilter)
			const className = ClassNames('category', { active })

			const props = { className, key }

			if (!active) {
				props['data-filter'] = filter

				props.onClick = (event) => {
					const {target} = event
					const filter = target.getAttribute('data-filter')
					console.log(filter)

					store.dispatch({type: 'FILTER_RECIPES', filter})
				}
			}

			return <div {...props}>{ title }</div>
		}

		const renderCategory = (category, index) => {
			const key = 'category-' + index
			// const active = (filter === this.state.visibilityFilter)
			
			let active = false

			if (category === 'All Categories' && !this.state.selectedCategory) {
				active = true
			} else {
				active = (category === this.state.selectedCategory)
			}

			const className = ClassNames('category', { active })

			const props = { className, key }

			if (!active) {
				// props['data-filter'] = filter

				props.onClick = (event) => {
					const {target} = event
					const filter = target.innerText
					console.log(filter)

					store.dispatch({type: 'FILTER_CATEGORIES', filter})
				}
			}

			return <div {...props}>{ category }</div>
		}

		let categories = this.state.categories.slice(0)
		categories.splice(0, 0, "All Categories")

		return <div className="application">
			<div className="recipeCategories">
				<div className="recipeAppBox">
					<img src="/images/logo.png" />
					<button onClick={ revert }>Revert Data</button>
				</div>
				<div className="categories">
					{ filters.map(renderFilter) }
					<hr />
					{ categories.map(renderCategory) }
				</div>
			</div>
			{ content }
		</div>
	}
}

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('content'))