import {createStore} from 'redux'
import {Map, List, fromJS} from 'immutable'

// Test data
import testData from './test_data/recipes.js'

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
		
		case 'UPDATE_RECIPE':
			return state.update('items', items => {
				return items.update(action.index, item => {
					return item.merge(action.update)
					// return item.set('name', action.name)
				})
			})
		
		default:
			return state
	}
}

const savedJSONData = localStorage.getItem('SAVED_STATE')
let initialData = null

if (savedJSONData) {
	initialData = fromJS(JSON.parse(savedJSONData))
} else {
	initialData = fromJS({ items: testData, selectedItem: -1})
}

export default createStore(handleAction, initialData)