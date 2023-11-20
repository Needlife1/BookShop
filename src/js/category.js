import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books/';
const endpointList = 'category-list';

async function fetchCategories() {
    try {
      
      const response = await axios.get(BASE_URL + endpointList);
    
      if (response.status === 200) {
        const categories = response.data; 
        const categoriesList = document.querySelector('.categories-list');

        categories.map(category => {
          const li = document.createElement('li');
          li.textContent = category.list_name;
          li.classList.add('categ-item'); 
          categoriesList.appendChild(li);
        });
      } else {
        Notiflix.Notify.failure(`Request execution error. Status code: ${response.status}`);
      }
    } catch (error) {
        Notiflix.Notify.failure('An error occurred while sending the request.');
        console.error('An error occurred while sending the request:', error);
    }
  }
  
  fetchCategories();