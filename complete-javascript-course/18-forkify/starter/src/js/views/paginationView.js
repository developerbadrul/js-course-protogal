import icons from 'url:../../img/icons.svg';
import View from "./View.js";
// import { Fraction } from 'fractional'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');


    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            console.log(btn);

            const goToPage = +btn.dataset.goto;

            handler(goToPage)
        })
    }

    _generateMarkup() {
        const currPage = this._data.currentPage;
        const totalPages = Math.ceil(this._data.result.length / this._data.resultsPerPage)
        // console.log(this._data, 'in pagination', totalPages, currPage);

        // Page One & there are other pages 
        if (currPage === 1 & totalPages > 1) {
            return `
              <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>
            `
        }
        // Last page 
        if (currPage === totalPages & totalPages > 1) {
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
            `
        }
    // Other pages 
        if (currPage < totalPages) {
            return `
             <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
                </button>
                <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
            `
        }
        // Page One & there are other pages 
        return ''

    }
}


export default new PaginationView();