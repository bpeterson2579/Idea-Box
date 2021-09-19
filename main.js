var ideas = [];
var ideaBox;

var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var saveButton = document.querySelector('.locked-button');
var searchIdeasButton = document.querySelector('.search-button');
var searchIdeasInput = document.querySelector('.search-input');
var gridContainer = document.querySelector('.grid-container');
var showFavoriteIdeas = document.querySelector('.show-idea-button');



saveButton.addEventListener('click', createIdeaCard);
document.addEventListener('DOMContentLoaded', displayIdeaCard);
inputTitle.addEventListener('keyup', lockSaveButton);
inputBody.addEventListener('keyup', lockSaveButton);
gridContainer.addEventListener('click', changeCard);
showFavoriteIdeas.addEventListener('click', filterFavorites);

function createIdeaCard() {
  event.preventDefault();

  ideaBox = new Idea(inputTitle.value, inputBody.value);
  ideaBox.saveToStorage();

  saveToLocalStorage(ideas);

  displayIdeaCard();
}

function saveToLocalStorage(ideas) {
  var stringifiedIdeas = JSON.stringify(ideas);
  localStorage.setItem("stringIdeas", stringifiedIdeas);
}

function pullFromLocalStorage() {
  var retrievedIdeas = localStorage.getItem("stringIdeas");
  ideas = JSON.parse(retrievedIdeas);
}

function displayIdeaCard() {
  if (localStorage.hasOwnProperty("stringIdeas")) {
    pullFromLocalStorage();
  }
  renderCards();
  clearForm();
  lockSaveButton();
}

function renderCards() {
  var starPicture;
  gridContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].isFavorite) {
      starPicture = "assets/star-active.svg";
    }else {
      starPicture = "assets/star.svg";
    }
    gridContainer.innerHTML += `
      <div class="box">
        <header class="card-header">
          <img src=${starPicture} class="star-img" id="${ideas[i].id}">
          <img src="assets/delete.svg" class="delete-img" id="${ideas[i].id}">
        </header>
        <div class="user-idea">
          <h4 class="user-title">${ideas[i].title}</h4>
          <p>${ideas[i].body}</p>
        </div>
        <footer class="card-footer">
          <img src="assets/comment.svg" class="comment-img">
          <p class="card-comment">Comment</p>
        </footer>
      </div>`
  }
}

function changeCard(event) {
  if (event.target.classList.contains('star-img') || event.target.classList.contains('active-star-img')) {
    favoriteIdeaCard(event.target.id);
  }else if (event.target.classList.contains('delete-img')) {
    deleteIdeaCard(event.target.id);
  }
}

function deleteIdeaCard(id) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(id)) {
      ideas.splice(i, 1);
      // ^^^^ Maybe refactor at end of project? //
      // ideaBox.deleteFromStorage(i);
      saveToLocalStorage(ideas);
      displayIdeaCard();
    }
  }
}

function favoriteIdeaCard(id) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(id) && !ideas[i].isFavorite) {
      ideas[i].isFavorite = true;
      saveToLocalStorage(ideas);
      displayIdeaCard();
    }else if(ideas[i].id === Number(id) && ideas[i].isFavorite){
      ideas[i].isFavorite = false;
      saveToLocalStorage(ideas);
      displayIdeaCard();
    }
  }
}

function filterFavorites() {
  showFavoriteIdeas.innerText = 'Show All Ideas';
  console.log('1st', ideas);
  for (var i = 0; i < ideas.length; i++) {
    if (!ideas[i].isFavorite) {
      ideas.splice(i, 1);
      console.log(i, ideas);
    }
  }
  displayIdeaCard();
}

function clearForm() {
  inputBody.value = '';
  inputTitle.value = '';
}

function lockSaveButton() {
  if (inputTitle.value === '' || inputBody.value === '') {
    saveButton.classList.remove('save-button');
    saveButton.disabled = true;
  } else {
    saveButton.classList.add('save-button');
    saveButton.disabled = false;
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
