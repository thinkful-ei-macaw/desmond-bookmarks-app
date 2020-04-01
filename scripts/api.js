import store from './store.js';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/desmondw';

function getFetch(...args) {
  let error;
  store.resetError();
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
  
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
  
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

function getData() {
  return getFetch(`${BASE_URL}/bookmarks`);
}

function createNewBookmark(item) {
  return getFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
}


export default {
  getData,
  createNewBookmark,
 
};