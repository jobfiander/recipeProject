import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
// import ClassNames from 'classnames'

import store from './stores/recipeStore.js'

import RecipeList from './components/recipeList.jsx'
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
		if (this.state.selectedItem >= 0) {
			const recipe = this.state.items[this.state.selectedItem]
			return <RecipeView store={ store } recipe={ recipe } recipeIndex={ this.state.selectedItem } />
		}

		return <RecipeList store={ store } items={ this.state.items }/>
	}
}

ReactDOM.render(<App />, document.getElementById('content'))