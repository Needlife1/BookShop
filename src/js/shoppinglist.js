import sprite from '../images/icons.svg';
// import amazonLogo from '../images/amazon_logo.svg';
// import appleBooksLogo from '../images/apple_books.svg';
// import booksPic from '../images/books.png';
import amazonLogo from '../images/amazon.png';
import amazonDarkLogo from '../images/amazon-darck.png';
import appleBooksLogo from '../images/apple.png';

const elements = {
container: document.querySelector('.js-list'),
totalQuantity: document.querySelector('.js-quantity'),
clearBtn: document.querySelector('.js-clear'),
pageName: document.querySelector('.js-title'),
message: document.querySelector('.js-message'),
booksImg: document.querySelector('.js-books'),
body: document.querySelector('body'),
}


const BOOKS_KEY = 'booksInList'

var books = null;

updateShoppingCart();

elements.container.addEventListener('click', (event) => {

  var btn = null
  if (event.target.classList.contains('icon-delete')) {
    btn = event.target.parentNode;
  }
  else if (event.target.parentNode.classList.contains('icon-delete')) {
    btn = event.target.parentNode.parentNode;
  }
  else if (event.target.classList.contains('btn-delete')) {
    btn = event.target;
  }
  if (btn)
    handlerRemoveSingleBook(btn.dataset.id)
})

function createMarkup(arr) {
  return arr.map(({_id, book_image, title, list_name, description, author, buy_links})=> `
<li data-id='${_id}' class='shopping-card-item'>
    <img src='${book_image}' alt ='${title}' class='shopping-img'>
    <div class="shopping-info">
      <h2 class='shopping_title description-title'>${title}</h2>
      <p class='shopping-list_name'>${list_name}</p>
      <h3 class='shopping-text description'>${description}</h3>
      <div class='shopping-socials'>
        <p class= 'shopping_author'>${author}</p>
        <ul class="socials_list">
          ${createBuyLinksMarkup(buy_links)}
        </ul>
      </div>
    </div>

  <button type="button" class="js-clear btn-delete", data-id=${_id}>
    <svg class="icon-delete" width="28" height="28">
      <use href="${sprite}#icon-trash"></use>
    </svg>
  </button>

</li>`).join('');
}

function createBuyLinksMarkup(buyLinks) {
    return buyLinks.slice(0, 2)
    .map((buyLink) => {
      let sellerLogo = null;
      let cssClass = null;
      if (elements.body.classList.contains('dark-theme')) {
        console.log('dark');
      switch (buyLink.name) {
        case 'Amazon': {
          cssClass = "social-icon-amazon"
          sellerLogo = `${amazonDarkLogo}`;
          break;
        }
        case 'Apple Books': {
          sellerLogo = `${appleBooksLogo}`;
          cssClass = "social-icon-book";
          break;
        }
        default: {
          sellerLogo = `${appleBooksLogo}`;
          cssClass = "social-icon-book";
        }
      }
    } else {
        switch (buyLink.name) {
          case 'Amazon': {
            sellerLogo = `${amazonLogo}`;
            break;
          }
          case 'Apple Books': {
           sellerLogo = `${appleBooksLogo}`;
            break;
          }
          default: {
            sellerLogo = `${appleBooksLogo}`;
          }
        }
      }
      return `<li class = "book-icon">
      <a
        class=${cssClass}
        href=${buyLink.url}
        target="_blank"
      rel="nofollow noopener noreferree"
        aria-label="Book icon"
      >
      <img src=${sellerLogo} class= "social-icon" alt="${buyLink.name}" width ='32px' height='32px'/>
      </a>
  </li>`}
  ).join('');
}



function updateShoppingCart() {
  books = JSON.parse(localStorage.getItem(BOOKS_KEY)) ?? [];
  if (books.length) {
    elements.booksImg.style.display = 'none';
    elements.message.style.display = 'none';
    elements.container.innerHTML = createMarkup(books);

  } else {
    elements.container.innerHTML = "";
    elements.booksImg.style.display = "block";
    elements.message.style.display = 'block';
    elements.booksImg.style.visibility = 'visible';
    elements.message.style.visibility = 'visible';
  }
}

function handlerRemoveSingleBook(idToDelete) {
  const updatedBooksList = books.filter(book => book._id !== idToDelete);
  if (updatedBooksList.length == 0)
    localStorage.removeItem(BOOKS_KEY);
  else
    localStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooksList));
  //window.location.href = "./index.html";
  updateShoppingCart();

}

function handlerClearBasket(evt) {
  localStorage.removeItem(BOOKS_KEY);
  window.location.href = "./index.html";
}


