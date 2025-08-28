import View from "./View.js";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');


    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow() {
        // this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
        this._btnOpen.addEventListener('click', () => this.toggleWindow())
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', () => this.toggleWindow())
        this._overlay.addEventListener('click', () => this.toggleWindow())
    }

    _generateMarkup() {
        // console.log(this._data);

    }




}

export default new AddRecipeView()