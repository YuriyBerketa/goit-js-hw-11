import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
// import { searchPhoto } from './fetch.js';
import { UnsplashAPI } from './fetch';
import createGalleryCards from './templates/gallery-card.hbs';


const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");



const unsplashAPI = new UnsplashAPI();

const onFormSubmit = evt => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    btnLoadMore.classList.add('is-hidden');

    if (evt.currentTarget.searchQuery.value === '') {
        return;
    }
   
    unsplashAPI.q = evt.currentTarget.searchQuery.value.trim();
 
    evt.currentTarget.searchQuery.value = '';
    unsplashAPI.page = 1;

    unsplashAPI.fetchPhotos().then(data => { 
        galleryEl.innerHTML = createGalleryCards(data.hits);
        if (!data.total || data.hits === []) {
            Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
        }
        if (data.totalHits === unsplashAPI.total) {
            return;
        }

        if (data.totalHits > unsplashAPI.count) {
            btnLoadMore.classList.remove('is-hidden');
            return;
        }

        btnLoadMore.classList.add('is-hidden');
     }).catch(err => {console.log(err)});
}

const onLoadMoreBtnClick = () => {
    unsplashAPI.page += 1;
    btnLoadMore.disabled = true;

    unsplashAPI.fetchPhotos().then(data => {
        galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

         if (unsplashAPI.page * unsplashAPI.count >= data.totalHits) {
        Notify.warning(
    'We re sorry, but you ve reached the end of search results.'
             );
        btnLoadMore.classList.add('is-hidden');
             
    }
    }).catch(err => { console.log(err) });
    
   
}

searchFormEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMoreBtnClick);







