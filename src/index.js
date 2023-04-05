import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { UnsplashAPI } from './fetch';
import createGalleryCards from './templates/gallery-card.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");


const unsplashAPI = new UnsplashAPI();

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  scrollZoom: false,
});

const onFormSubmit = async evt => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    btnLoadMore.classList.add('is-hidden');

    let searchText = evt.currentTarget.searchQuery.value.trim();

    if (searchText === '') {
        return;
    }
   
    unsplashAPI.q = searchText;
 
    evt.currentTarget.searchQuery.value = '';
    unsplashAPI.page = 1;

    try {
        const { data } = await unsplashAPI.fetchPhotos();
        Notify.info(`Hooray! We found ${data.totalHits} images.`);

        galleryEl.innerHTML = createGalleryCards(data.hits);
        lightbox.refresh();

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
    } catch (err) {
        console.log(err);
    }
}

const onLoadMoreBtnClick = async () => {
    unsplashAPI.page += 1;
    btnLoadMore.disabled = true;
    try {
        const { data } = await unsplashAPI.fetchPhotos();
            galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

            lightbox.refresh();

            if (unsplashAPI.page * unsplashAPI.count >= data.totalHits) {
                Notify.warning(
                    'We re sorry, but you ve reached the end of search results.'
                );
                btnLoadMore.classList.add('is-hidden');
        }
        btnLoadMore.disabled = false;
        smoothScroll();
    
    } catch (err) { console.log(err) };
}; 


searchFormEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMoreBtnClick);


function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}





