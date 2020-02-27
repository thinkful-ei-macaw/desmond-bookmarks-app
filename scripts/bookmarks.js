import store from "./store";

const generateEmptyBookmark=function(){
 return `<div class='bookmark-container">
 <h1>Bookmarks</h1>
 <form id=bookmark-form>
 <button class="entry" type="enter">Add a Bookmark</button>
 <button class="delete" type="remove">Delete Bookmark</button>
 <select name="rating" id="filter-by-rating">
 <option value="">Rating</option>
 <option value="5">5</option>
 <option value="4">4</option>
 <option value="3">3</option>
 <option value="2">2</option>
 <option value="1">1</option>
 </select>
 </form>
`;
}

const newBookmark=function(){
    return `<div class='bookmark-container">
    <h1>My Bookmarks</h1>
    <form id=bookmark-form>
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" placeholder="Title here" required/><br>
    <label for="url">Link: </label>
    <input type="text" name="title" id="title" placeholder="Title here" required/><br>
    <label for="description">Description:</label>
    <input type="text" name="title" id="title" placeholder="Title here" required/><br>
    <label for="rating">Rating: </label>
    <select name="rating" id="book-new-rating">
    <option value="">Rating</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select><br>
<div>
<button class="add-entry" type="button">Add a Bookmark</button>
<button class="cancel-entry"type="button">Cancel</button>
</div>
</form>
</div>
    `;
}
const render=function(){
if(store.empty===true) {
   generateEmptyBookmark(); 
}};

export default{
    render
};

