import {createStore} from 'redux'
import {Map, List, fromJS} from 'immutable'

// Test data
import testData from './test_data/recipes.js'

// Kill switch - use wisely jobie
// localStorage.removeItem('SAVED_STATE')

function handleAction(state, action) {
	switch (action.type) {
		case 'OPEN_RECIPE':
			return state.set('selectedItem', action.id)

		case 'CLOSE_RECIPE':
			return state.set('selectedItem', -1)

		case 'TOGGLE_EDIT':
			console.log("Edit")
			console.log(action.key)

			return state.update('editMap', map => {
				if (!map) {
					map = new Map()
				}

				console.log(map)
				
				return map.set(action.key, !map.get(action.key))
			})

		case 'RATE_RECIPE':
			return state.update('items', items => {
				const id = action.id.toString()

				return items.update(id, item => {
					return item.set('rating', action.rating)
				})
			})

		case 'LOVE_RECIPE':
			return state.update('items', items => {
				return items.update(action.id, item => {
					return item.set('loved', !item.get('loved'))
				})
			})

		case 'UPDATE_RECIPE_NAME':
			return state.update('items', items => {
				return items.update(action.id, item => {
					return item.set('name', action.name)
				})
			})
		
		case 'UPDATE_RECIPE':
			return state.update('items', items => {
				const id = action.id.toString()
				console.log("Update")
				console.log(action.id)
				return items.update(id, item => {
					return item.merge(action.update)
					// return item.set('name', action.name)
				})
			})

		case 'ADD_INGREDIENT':
			return state.update('items', (items) => {
				const id = action.id.toString()

				return items.update(id, (item) => {
					console.log("Item")
					console.log(item)
					return item.update('ingredients', ingredients => {
						console.log("Push ingredient")
						return ingredients.push(fromJS({ name: '' }))
					})
				})
			})

		case 'EDIT_INGREDIENT':
			const {index, value} = action

			return state.update('items', (items) => {
				const id = action.id.toString()

				return items.update(id, (item) => {
					return item.update('ingredients', ingredients => {
						return ingredients.update(index, ingredient => {
							console.log("Ingredient")
							console.log(ingredient)
							console.log("Value: " + value)
							return ingredient.set('name', value)
						})
					})
				})
			})

		case 'CLEAR_EMPTY_INGREDIENTS':
			return state.update('items', (items) => {
				const id = action.id.toString()

				return items.update(id, (item) => {
					return item.update('ingredients', (ingredients) => {
						// console.log("Update ingredients")

						let ingredientsArray = ingredients.toJS()
						let newIngredientsArray = []

						for (var i = 0; i < ingredientsArray.length; i++) {
							let ingredient = ingredientsArray[i]

							if (ingredient.name.length > 0) {
								newIngredientsArray.push(ingredient)
							}
						}

						return fromJS(newIngredientsArray)

						// return ingredients.map((ingredient) => {
						// 	console.log("Map ingredient")
						// 	console.log(ingredient)

						// 	if (ingredient.get('name').length > 0) {
						// 		return ingredient
						// 	}

						// 	return null
						// })
						// return ingredients.update(index, ingredient => {
						// 	console.log("Ingredient")
						// 	console.log(ingredient)
						// 	console.log("Value: " + value)
						// 	return ingredient.set('name', value)
						// })
					})
				})
			})
		
		case 'REVERT_DATA':
			localStorage.removeItem('SAVED_STATE')
			return fromJS({ items: testData, selectedItem: -1, visibilityFilter: 'SHOW_ALL', editMap: { directions: false }})
		
		case 'FILTER_RECIPES':
			return state.set('visibilityFilter', action.filter)

		default:
			return state
	}
}

const savedJSONData = localStorage.getItem('SAVED_STATE')
let initialData = null

if (savedJSONData) {
	initialData = fromJS(JSON.parse(savedJSONData))
} else {
	initialData = fromJS({ items: testData, selectedItem: -1, visibilityFilter: 'SHOW_ALL', editMap: { directions: false }})
}

export default createStore(handleAction, initialData)