import { async } from 'regenerator-runtime';
import { API_URL, KEY } from './config.js';
import { getJSON, sendJSON } from './views/helpers.js';
import { RES_PER_PAGE } from './config.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        currentPage: 1,
        result: [],
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
}

// console.log(state);

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key })
    }
}

export const loadRecipe = async function (id) {
    try {

        const data = await getJSON(`${API_URL}/recipes/${id}`)

        state.recipe = createRecipeObject(data)
        // console.log(state.recipe)
        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else state.recipe.bookmarked = false;
    } catch (error) {
        // alert(error.message)
        console.error(error)
        throw error;
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
        state.search.currentPage = 1;
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

const persistBookmark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function (recipe) {
    //add bookmark
    state.bookmarks.push(recipe)

    // mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmark()
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmark()
}

const init = function () {
    const storage = localStorage.getItem('bookmarks')
    if (storage) state.bookmarks = JSON.parse(storage)
};

init();
// console.log(state.bookmarks);

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1].trim() !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());

                // Must have exactly 3 values: [quantity, unit, description]
                if (ingArr.length !== 3) {
                    throw new Error(`Wrong ingredient format: "${ing[1]}". Please use "quantity,unit,description"`);
                }

                const [quantity, unit, description] = ingArr;
                return {
                    quantity: quantity ? +quantity : null,
                    unit,
                    description,
                };
            });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }

        const data = await sendJSON(`${API_URL}/recipes?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe)
    } catch (error) {
        throw error
    }
};
