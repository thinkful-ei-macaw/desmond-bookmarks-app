const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      desc: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      desc: 'dolorum tempore deserunt',
      expanded: false
    }
  ],
  error: null,
  filter: 0
};

function addBookmark(bookmark) {
  store.bookmarks.push(bookmark);
}


function setError(error) {
  store.error = error;
}

function resetError(){
  store.error=null;
}
function findById(id){
  return store.bookmarks.find((bookmark)=>bookmark.id===id);
}

function setFilter(rating) {
  store.filter = rating;
}
function deleteBookmark(id){
  return(store.bookmarks = store.bookmarks.filter(
    selected => selected.id !==id
  ));
}

export default {
  store,
  addBookmark,
  setFilter,
  setError,
  resetError,
  findById,
  deleteBookmark
};
