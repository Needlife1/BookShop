import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://books-backend.p.goit.global/';

export async function getTopBooks() {
    const response = await axios.get('/books/top-books');
    return response.data
}

export async function getBooksByCategory(category) {
    const response = await axios.get(`books/category?category=${category}`);
    return response.data
}

export async function getbookDetais(bookId) {
    const response = await axios.get(`books/${bookId}`);
    return response.data
}
