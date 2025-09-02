import * as model from './model.js'
import recipeView from './views/recipeViews.js'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

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
    // debugger;
    // update bookmark seleceted
    bookmarkView.update(model.state.bookmarks)
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

const controlBookmark = function () {
  // add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe)

  // update bookmark
  bookmarkView.render(model.state.bookmarks)
}

const controlLocalBookmarks = function () {
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);

}

const init = function () {
  bookmarkView.addHandlerRender(controlLocalBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSerachResults);
  paginationView.addHandlerClick(controlPagination)
  addRecipeView._addHandlerUpload(controlAddRecipe)
}

init()

