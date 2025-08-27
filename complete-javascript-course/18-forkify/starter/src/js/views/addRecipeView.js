import icons from 'url:../../img/icons.svg';
import View from "./View.js";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmark yet. find a nice recipes & bookmark it ;)';
    _message = '';

   
    _generateMarkup() {
        // console.log(this._data);
        return this._data?.map(result => this._generateMarkupPreview(result)).join('');
    }

   
    

}


export default new AddRecipeView()