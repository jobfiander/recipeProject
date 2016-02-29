import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import store from './stores/recipeStore.js'
import ClassNames from 'classnames'

import { Provider } from 'react-redux'

import VisibleRecipeList from './components/visibleRecipeList.jsx'
import RecipeView from './components/recipeView.jsx'

store.subscribe(() => {
	// Save data
	localStorage.setItem('SAVED_STATE', JSON.stringify(store.getState().toJS()))
})

class App extends Component {
	constructor(props) {
		super(props)
		
		this.state = store.getState().toJS()
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState(store.getState().toJS())
		})
	}

	render() {
		console.log("Render app")
		
		let content = <VisibleRecipeList />

		if (this.state.selectedItem >= 0) {
			const recipe = this.state.items[this.state.selectedItem]
			content = <RecipeView store={ store } recipe={ recipe } index={ this.state.selectedItem } />
		}

		const revert = () => {
			store.dispatch({ type: 'REVERT_DATA' })
		}

		const categories = [
			{
				filter: 'SHOW_ALL',
				title: 'All'
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

		const renderCategory = ({filter, title}) => {
			console.log('State')
			console.log(this.state)

			console.log(store.getState())

			const key = 'category-' + filter
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

		return <div className="application">
			<div className="recipeCategories">
				<div className="recipeAppBox">
					<img src="/images/logo.png" />
					<button onClick={ revert }>Revert Data</button>
				</div>
				<div className="categories">
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