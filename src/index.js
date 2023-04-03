import Notiflix from 'notiflix';
import axios from 'axios';
// import { searchPhoto } from './fetch.js';
import { AxiosAPI } from './fetch';

// BASE_URL = 'https://pixabay.com/api/';
// API_KEY = 'key=35037895-f6564ffc1e5d4db0bbe999e92';
// IMAGE_TYPE = 'image_type=photo';
// ORIENTATION = 'orientation=horizontal';
// SAFESEARCH = 'safesearch=true';
// import searchPhoto from './fetch.js';

const searchFormEl = document.querySelector('#search-form');
console.log(searchFormEl);

const galleryEl = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");
const inputEl = document.getElementsByName("searchQuery");


console.log(inputEl);

const axiosAPI = new AxiosAPI();

const onFormSubmit = evt => {
    evt.preventDefault();

    axiosAPI.querry = evt.target.elements.searchQuery.value;

    axiosAPI.fetchPicture().then(data => { console.log(data) });
}

searchFormEl.addEventListener('submit', onFormSubmit);






