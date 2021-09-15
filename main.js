var ideas = [];
var ideaBox;

var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');

var saveButton = document.querySelector('.save-button');
var searchIdeasButton = document.querySelector('.search-button');
var searchIdeasInput = document.querySelector('.search-input');
var gridContainer = document.querySelector('.grid-container');


saveButton.addEventListener('click', createIdeaCard);

function createIdeaCard() {
  event.preventDefault();

  ideaBox = new Idea(inputTitle.value, inputBody.value);
  ideaBox.saveToStorage(ideaBox);

  displayIdeaCard()
}

function displayIdeaCard() {
  gridContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    gridContainer.innerHTML += `
      <div class="box">
        <header class="card-header">
          <img src="assets/star.svg" class="comment-star-delete-img">
          <img src="assets/star-active.svg" class="card-star-active hidden">
          <img src="assets/delete.svg" class="comment-star-delete-img">
        </header>
        <div class="user-idea">
          <h4 class="user-title">${ideas[i].title}</h4>
          <p>${ideas[i].body}</p>
        </div>
        <footer class="card-footer">
          <img src="assets/comment.svg" class="comment-star-delete-img">
          <p class="card-comment">Comment</p>
        </footer>
      </div>`
  }
}
