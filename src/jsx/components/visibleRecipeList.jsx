import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
import RecipeList from './recipeList.jsx'

const getVisibleRecipes = (recipes, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return recipes

    case 'SHOW_LOVED':
      return recipes.filter(r => r.loved)

    case 'SHOW_UNLOVED':
      return recipes.filter(r => !r.loved)

    default:
      return recipes
  }
}

const getVisibleRecipesForCategory = (recipes, category) => {
  if (category) {
    return recipes.filter(r => (r.category == category))
  }

  return recipes
}

const mapStateToProps = (state) => {
  let recipeMap = state.get('items').toJS()
  let recipeIDs = Object.keys(recipeMap)
  let recipes = []

  for (var i = 0; i < recipeIDs.length; i++) {
    let recipeID = recipeIDs[i]
    let recipe = recipeMap[recipeID]
    recipe.id = recipeID
    recipes.push(recipe)
  }
  // const recipes = state.get('items').toJS()
  const items = getVisibleRecipesForCategory(getVisibleRecipes(recipes, state.get('visibilityFilter')), state.get('selectedCategory'))
  
  return { items }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpen: (id) => {
      dispatch({ type: 'OPEN_RECIPE', id })
    },
    
    onRate: (id, rating) => {
      dispatch({ type: 'RATE_RECIPE', id, rating })
    },

    onLove: (id) => {
      dispatch({ type: 'LOVE_RECIPE', id })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList)