import { getTopBooks, getBooksByCategory } from './books-api';
const list = document.querySelector('.books');
const categoryList = document.querySelector('.categories-list');
const booksCategoryName = document.querySelector('#books-category-name');
const modalLoading = document.querySelector('.modal-loading');

// Завантаження даних перенесено в books-api.js
// Ця функція буде викликана при початовому завантаженні сторінки для заповнення Top Books
loadOnStartup();

async function loadOnStartup() {
  modalLoading.classList.remove('hidden');
  // Функція оголошена, як асинхронна, так як ми маємо дочекатися завантаження даних.
  const booksData = await getTopBooks();
  // після одержання даних викликаємо функцію, яка генерує html розмітка
  const markup = categoriesMarkup(booksData);
  list.insertAdjacentHTML('beforeend', markup);
  modalLoading.classList.add('hidden');
}

function categoriesMarkup(data) {
  // Функція створює розмітку для одержаних категорій
  // Далі для кожної категорії викликаємо функцію розмітки для книг (booksMarkup)
  return data.map(res => {
    return singleCategoryMarkup(res.list_name, res.books, false);
  });
}

function singleCategoryMarkup(categoryName, books, isSingleCategory) {
  let markup = !isSingleCategory
    ? `
    <div class = "books-list-name" >${categoryName}</div>`
    : '';
  markup += `<ul class="books-container ${
    isSingleCategory ? 'books-container-multi' : ''
  }">
                    ${booksMarkup(books)}
                </ul>`;
  const buttonMarkup = !isSingleCategory
    ? `<button class = "books-btn" type = "button" id="${categoryName}"> SEE MORE </button>`
    : '';
  markup += buttonMarkup;
  return markup;
}

function booksMarkup(books) {
  // Функція створює розмітку для списку книг
  return books
    .map(book => {
      return `<li class="book-block-two">
                <div data-book=${book._id} class="book-block">
                    <img src="${book.book_image}" class="book-pic" width=120 heigh=240 />
                    <p class="book-name">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                </div>
         </li>`;
    })
    .join('');
}

// Обробник кліку на категорії - завантажуємо книги для категорії і виділяємо акитивну категорію
categoryList.addEventListener('click', async e => {
  e.preventDefault();

  if (e.target == categoryList) {
    // Натиснули на список, а не на елемент (між елементами), ігноруємо
    return;
  }
  const selectedCategory = e.target.innerHTML;
  reloadBooksForCategory(selectedCategory);
});

async function reloadBooksForCategory(selectedCategory) {
  modalLoading.classList.remove('hidden');
  for (const child of categoryList.children)
    if (child.innerHTML != selectedCategory)
      child.classList.remove('is-active-item');
    else child.classList.add('is-active-item');

  let markup = null;
  if (selectedCategory == 'All categories') {
    populateCategoryHeader('Best Sellers Books');
    const data = await getTopBooks();
    markup = categoriesMarkup(data);
  } else {
    populateCategoryHeader(selectedCategory);
    const data = await getBooksByCategory(selectedCategory);
    markup = singleCategoryMarkup(selectedCategory, data, true);
  }
  list.innerHTML = markup;
  modalLoading.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateCategoryHeader(categoryName) {
  // Update categories header (h1) with selected category name
  const words = categoryName.split(' ');
  booksCategoryName.innerHTML = `<span class="dark-text">${
    words[0]
  }</span> ${words.slice(1).join(' ')}`;
}

list.addEventListener('click', async event => {
  // Тільки коли клікнули на кнопці, завантажуємо книги цієї категорії
  if (event.target.classList.contains('books-btn')) {
    const selectedCategory = event.target.id;
    reloadBooksForCategory(selectedCategory);
  }
});
