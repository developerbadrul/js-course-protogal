import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './views/helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        currentPage: 1,
        result: [],
        resultsPerPage: RES_PER_PAGE
    }
}


export const loadRecipe = async function (id) {
    try {

        const data = await getJSON(`${API_URL}/recipes/${id}`)

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            image: recipe.image_url
        }
        // console.log(state.recipe)
    } catch (error) {
        // alert(error.message)
        throw error;
        console.error(error)
    }

}

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}/recipes?search=${query}`)
        state.search.result = data?.data?.recipes?.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url
            }
        })

    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getSearchResultsPage = function (page = state.search.currentPage) {
    state.search.currentPage = page
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.result.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings
    });

    state.recipe.servings = newServings
}