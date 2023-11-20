// =====================Логика открыть/закрыть модалку===========================
import amazonLogo from '../images/amazon.png';
import amazonDarkLogo from '../images/amazon-darck.png';
import appleBooksLogo from '../images/apple.png';
import { throttle } from 'lodash';
import { getbookDetais } from './books-api';

const elements = {
  coverModal: document.querySelector('.cover-modal'),
  modalCoverContent: document.querySelector('.modal-cover-content'),
  closeBtn: document.querySelector('.modal-btn-close'),
  addBtn: document.querySelector('.add'),
  removeBtn: document.querySelector('.remove'),
  openListBtn: document.querySelector('.open-list'),
  modalText: document.querySelector('.modal-add-text'),
  booksListElement: document.querySelector('.books'),
  body: document.querySelector('body'),
};

elements.booksListElement.addEventListener('click', event => {
  let cardBookId = null;
  if (event.target.classList.contains('book-block'))
    cardBookId = event.target.dataset.book;
  else if (event.target.parentNode.classList.contains('book-block'))
    cardBookId = event.target.parentNode.dataset.book;
  else return;

  getBookInfo(cardBookId);
});

async function getBookInfo(id) {
  try {
    const bookData = await getbookDetais(id);

    elements.modalCoverContent.dataset.selectedBookId = bookData._id;
    markupModal(bookData);
    openModl();
    changeTextBtn(bookData._id);
  } catch (error) {
    console.log(error);
  }
}

elements.removeBtn.addEventListener('click', () => {
  const selectedBookId = elements.modalCoverContent.dataset.selectedBookId;
  if (selectedBookId) removeBookFromList(selectedBookId);
});

elements.addBtn.addEventListener('click', async () => {
  const selectedBookId = elements.modalCoverContent.dataset.selectedBookId;
  if (selectedBookId) {
    // Нераціонально ще раз завантажувати інформацію про книгу тут
    // Треба переробити логіку, щоб в local storage зберігати тільки id книги, а не всю інформацію
    const bookData = await getbookDetais(selectedBookId);
    addBookToList(bookData);
  }
});

function markupModal(data) {
  const content = `
                <img src="${
                  data.book_image
                }" alt="book cover" class="modal-img">

                <div class="modal-contant-box">
                    <h2 class="modal-title">${data.title}</h2>
                    <h3 class="modal-book-author">${data.author}</h3>
                    <p class="modal-text">${data.description}</p>
                    <ul class="modal-list">
                        ${markupBuyLinks(data.buy_links)}
                    </ul>
                </div>`;

  elements.modalCoverContent.innerHTML = content;
}

function markupBuyLinks(buyLinks) {
  return buyLinks.slice(0, 2)
    .map(buyLink => {
      let sellerLogo = null;
      if (elements.body.classList.contains('dark-theme')) {
        console.log('dark');
        switch (buyLink.name) {
          case 'Amazon': {
            sellerLogo = `${amazonDarkLogo}`;
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

      return `<li class="modal-item">

              <a href="${buyLink.url}" target="_blank" rel="noopener noreferrer nofollow" class="modal-link">
              <img src=${sellerLogo} alt=${buyLink.name} class="modal-icon amazone-js"></a>
    </li>`;
    })
    .join('');
}

function openModl() {
  elements.coverModal.classList.add('visible-element');

  elements.body.classList.add('no-scroll');

  document.addEventListener('keydown', throttle(escCloseModal, 500));
}

elements.coverModal.addEventListener('click', e => {
  if (
    e.target.classList.contains('cover-modal') ||
    e.target.classList.contains('modal-btn-close')
  ) {
    elements.coverModal.classList.remove('visible-element');
    elements.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', escCloseModal);
  }
});

function escCloseModal(e) {
  if (e.key === 'Escape') {
    elements.coverModal.classList.remove('visible-element');
    document.removeEventListener('keydown', escCloseModal);
  }
}

function addBookToList(book) {
  const booksInList = getBooksInList();
  const isBookInList = booksInList.some(
    existingBook => existingBook._id === book._id
  );
  if (!isBookInList) {
    booksInList.push(book);
    saveBooksInList(booksInList);
  }

  changeTextBtn(book._id);
}

function getBooksInList() {
  return JSON.parse(localStorage.getItem('booksInList')) ?? [];
}

function saveBooksInList(booksInList) {
  localStorage.setItem('booksInList', JSON.stringify(booksInList));
}

function changeTextBtn(id) {
  const booksInList = getBooksInList();
  const isBookInList = booksInList.some(book => book._id === id);

  if (isBookInList) {
    elements.addBtn.style.display = 'none';
    elements.removeBtn.style.display = 'block';
    elements.modalText.style.display = 'block';
  } else {
    elements.addBtn.style.display = 'block';
    elements.removeBtn.style.display = 'none';
    elements.modalText.style.display = 'none';
  }
}

function removeBookFromList(id) {
  const booksInList = getBooksInList();
  const updatedBooksList = booksInList.filter(book => book._id !== id);
  saveBooksInList(updatedBooksList);

  changeTextBtn(id);
}
