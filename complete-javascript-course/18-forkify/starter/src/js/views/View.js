import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp)
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElement = newDOM.querySelectorAll('*');
    const curElements = this._parentElement.querySelectorAll('*')

    // update changed TEXT
    newElement.forEach((newEl, i) => {
      const curEl = curElements[i]
      // console.log(curEl, newEl.isEqualNode(curEl));
      if (!newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '') {
        // console.log(newEl.firstChild, newEl.firstChild.nodeValue);
        curEl.textContent = newEl.textContent
      };

      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => {
          // console.log(attr.name, attr.value);
          curEl.setAttribute(attr.name, attr.value)
        })
      }
    })


  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
        </div>
    `

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }



  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpnnier() {
    const markUp = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }


}