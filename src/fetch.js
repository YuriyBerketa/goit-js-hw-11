'use strict';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = 'key=35037895-f6564ffc1e5d4db0bbe999e92';
// const IMAGE_TYPE = 'image_type=photo';
// const ORIENTATION = 'orientation=horizontal';
// const SAFESEARCH = 'safesearch=true';

// export default function searchPhoto(evt) {
//     return fetch(`${BASE_URL}?${API_KEY}&q=${evt}&image_type=photo&$orientation=horizontal&$safesearch=true`).then(res => {
//         if (!res.ok) {
//             throw new Error(res.statusText);
//         }
//         return res.json();
//     }).then(data => {(console.log(data))})
// }

export class AxiosAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '35037895-f6564ffc1e5d4db0bbe999e92';
//   IMAGE_TYPE = 'image_type=photo';
//   ORIENTATION = 'orientation=horizontal';
//   SAFESEARCH = 'safesearch=true';

  querry = null;
  page = 1;
    count = 40;
    


    fetchPicture() {
      
        const searchParams = new URLSearchParams({
            querry: this.querry,
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
