import * as model from './model.js'
import recipeView from './views/recipeViews.js'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpnnier()
    // Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage())
    // load recipe
    await model.loadRecipe(id)
    // const {recipe} = model.state;
    // render recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    // alert(error.message)
    recipeView.renderError()
    console.error(error)
  }
}


const controlSerachResults = async function () {
  try {
    resultsView.renderSpnnier()
    // console.log(resultsView);

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    // console.log(model?.state?.search?.result);
    // resultsView.render(model?.state?.search?.result)
    resultsView.render(model.getSearchResultsPage())
    // console.log(model.getSearchResultsPage(1));

    paginationView.render(model.state.search)

  } catch (error) {
    console.error(error);
    resultsView.renderError("Faild to fetch Data, Try again!!!!")
  }
}

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage))
  paginationView.render(model.state.search)

}

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe)
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSerachResults);
  paginationView.addHandlerClick(controlPagination)
}

init()

