var ideas = [];
var ideaBox;

var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var saveButton = document.querySelector('.locked-button');
var searchIdeasButton = document.querySelector('.search-button');
var searchIdeasInput = document.querySelector('.search-input');
var gridContainer = document.querySelector('.grid-container');



saveButton.addEventListener('click', createIdeaCard);
document.addEventListener('DOMContentLoaded', lockSaveButton);
inputTitle.addEventListener('keyup', lockSaveButton);
inputBody.addEventListener('keyup', lockSaveButton);
gridContainer.addEventListener('click', changeCard);

function lockSaveButton() {
  if (inputTitle.value === '' || inputBody.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.classList.add('save-button');
    saveButton.disabled = false;
  }
  pullFromLocalStorage();
}

function createIdeaCard() {
  event.preventDefault();

  ideaBox = new Idea(inputTitle.value, inputBody.value);
  ideaBox.saveToStorage();
  saveToLocalStorage(ideas);
  displayIdeaCard();
  clearForm();
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
  gridContainer.innerHTML = '';

  for (var i = 0; i < ideas.length; i++) {
    gridContainer.innerHTML += `
      <div class="box">
        <header class="card-header">
          <img src="assets/star.svg" class="comment-star-delete-img" id="${ideas[i].id}">
          <img src="assets/star-active.svg" class="card-star-active hidden" id="${ideas[i].id}">
          <img src="assets/delete.svg" class="comment-star-delete-img" id="${ideas[i].id - 1}">
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
  clearForm();
}

function changeCard(event) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(event.target.id)) {
      favoriteIdeaCard();
    } else {
      deleteIdeaCard();
    }
  }
}

function deleteIdeaCard() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id - 1 === Number(event.target.id)) {
      ideas[i].deleteFromStorage(i);
    } else {
      ideas[i].updateIdea(i);
    }
  }
}

function favoriteIdeaCard() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(event.target.id)) {
      ideas[i].updateIdea(i);

    }
  }
}

function favoriteStatus() {
  var star = document.querySelector(".comment-star-delete-img");
  var activeStar = document.querySelector(".card-star-active");

  if (ideas[i].isFavorite) {
    show(activeStar);
    hide(star);
  } else {
    hide(activeStar);
    show(star);
  }
}


function clearForm() {
  inputBody.value = '';
  inputTitle.value = '';
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
