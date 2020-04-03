import store from './store.js';
import api from './api.js';

function render() {
  $('main').html(generateLandingPage());
}


function renderBookmarks() {
  $('#bookmark-list').html(listBookmarks());
}

function generateLandingPage() {
  return `
  <div class="bookmarks-container">
  <h1>Bookmarks</h1>
  <button id='new-bookmark'>Add a Bookmark</button>
  </div>
  <div class="ratings-container">
  <select class="filter-control" id="filter" aria-label='Filter ratings by minimum rating'>
  <option value='0'>All</option>
  <option value='5'>5 stars</option>
  <option value='4'>4 stars</option>
  <option value='3'>3 stars</option>
  <option value='2'>2 stars</option>
  <option value='1'>1 star</option>
  </select>

  <ul id="bookmark-list">${listBookmarks()}
  </ul>
  </div>
  `;
}


function generateBookmarkForm() {
  return `<div class="bookmarks-container">
          <h1>Bookmarks</h1>
          <form id="bookmarks-form">
            <fieldset> 
              <label for="title">Title: </label>
              <input type="text" name="title" id="title" required><br>
              <p>${store.store.error ? store.store.error.message : ''}</p>
              <label for="url">Website: </label>
              <input type="url" name="url" id="url" placeholder="https://" required><br>
              <label for="desc">Description:</label>
              <input type="text" name="desc" id="desc" required><br>
              <label for="rating">Rating: </label>
              <select class='filter-control' id='rating' name='rating' aria-label='Filter ratings'>
              <option value='rating-placeholder'>Rating</option>
              <option value='5'>5 stars</option>
              <option value='4'>4 stars</option>
              <option value='3'>3 stars</option>
              <option value='2'>2 stars</option>
              <option value='1'>1 star</option>
              </select>
              <button id="create" class="button">Create</button>
              <button id="cancel" class="button">Cancel</button>
            </fieldset>
          </form>
          </div>`;
}

function generateBookmark(bookmark){
  let html = `<li class="bookmark" id="${bookmark.id}">`;
  html += `<button class="expand">${bookmark.title}</button>`;
  html += `<p>Rating: ${bookmark.rating}</p>`;
  html += `<div class="accordion">${bookmark.desc}</div>`;
  html += `<button class="accordion"><a class="bookmark-url" href="${bookmark.url}" target="">visit me</a></button>`;
  html += `<button class="accordion" id="delete"> delete bookmark </button>`;
  html += `</li>`;
  return html;
}


function expandBookmark(){
  $('main').on('click','.expand',function(){
    $(this).siblings('.accordion').toggle();
  });
}
function listBookmarks() {
  let html = `<ul>`;
  let bookmarks =
    store.store.filter > 0
      ? store.store.bookmarks.filter((x) => x.rating >= store.store.filter)
      : store.store.bookmarks;
  bookmarks.forEach((x) => (html += generateBookmark(x)));
  html += `</ul>`;
  console.log(html);
  return html;
}

function startClick() {
  $('main').on('click', '#new-bookmark', function() {
    $('main').html(generateBookmarkForm());
    event.preventDefault();
  });
}

function createClick() {
  $('main').on('click', '#create', function(event) {
    event.preventDefault();
    const newBookmark = {
      title: $('#title').val(),
      url: $('#url').val(),
      rating: $('#rating').val(),
      desc: $('#desc').val()
    };
    api.createNewBookmark(newBookmark)
      .then((bookmark) => store.addBookmark(bookmark))
      .then(() => render())
      .catch((err)=>alert(err.message));
      // .catch((err)=>{
      //   store.setError(err);
      //   $('main').html(generateBookmarkForm());
      //   store.resetError();
      // });
  });
}

function cancelClick(){
  $('main').on('click', '#cancel', function(event){
    event.preventDefault();
    render();
  });
}

function deleteClick(){
  $('main').on('click','#delete', function(){
    let x = event.target.parentElement;
    let id=$(x).attr('id');
    store.deleteBookmark(id);
    render();
  });
}


function handleFilter(){
  $('main').on('change', '#filter', function(){
    store.setFilter(event.target.value);
    renderBookmarks();


  });
}
function startApp() {
  render();
  startClick();
  createClick();
  expandBookmark();
  deleteClick();
  handleFilter();
  cancelClick();
}

$(startApp);
