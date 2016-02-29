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

const mapStateToProps = (state) => {
  const recipes = state.get('items').toJS()
  const items = getVisibleRecipes(recipes, state.get('visibilityFilter'))
  
  return { items }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpen: (index) => {
      dispatch({ type: 'OPEN_RECIPE', index })
    },

    onRate: (index, rating) => {
      dispatch({ type: 'RATE_RECIPE', index, rating })
    },

    onLove: (index) => {
      dispatch({ type: 'LOVE_RECIPE', index })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList)