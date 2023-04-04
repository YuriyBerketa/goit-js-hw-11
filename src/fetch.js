'use strict';



export class UnsplashAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '35037895-f6564ffc1e5d4db0bbe999e92';
  q = null;
  page = 1;
  count = 40;
    


    fetchPhotos() {
      
        const searchParams = new URLSearchParams({
            q: this.q,
            page: this.page,
            per_page: this.count,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            key: this.#API_KEY,

        })
    return fetch(
      `${this.#BASE_URL}?${searchParams}`).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    });
  }
}
