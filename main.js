var ideas = [];
var ideaBox;

var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var saveButton = document.querySelector('.locked-button');
var searchIdeasButton = document.querySelector('.search-button');
var searchIdeasInput = document.querySelector('.search-input');
var gridContainer = document.querySelector('.grid-container');



saveButton.addEventListener('click', createIdeaCard);
document.addEventListener('DOMContentLoaded', displayIdeaCard);
inputTitle.addEventListener('keyup', lockSaveButton);
inputBody.addEventListener('keyup', lockSaveButton);
gridContainer.addEventListener('click', changeCard);

function lockSaveButton() {
  if (inputTitle.value === '' || inputBody.value === '') {
    saveButton.classList.remove('save-button');
    saveButton.disabled = true;
  } else {
    saveButton.classList.add('save-button');
    saveButton.disabled = false;
  }
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
  pullFromLocalStorage();
  renderCards();
  clearForm();
  lockSaveButton();
}

function renderCards() {
  gridContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    gridContainer.innerHTML += `
      <div class="box">
        <header class="card-header">
          <img src="assets/star.svg" class="star-img" id="${ideas[i].id}">
          <img src="assets/star-active.svg" class="star-active-img hidden" id="${ideas[i].id}">
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
    changeFavoriteImg(i);
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
      changeFavoriteImg(i);
      console.log('isFavorite true');
      saveToLocalStorage(ideas);
    }else if(ideas[i].id === Number(id) && ideas[i].isFavorite){
      ideas[i].isFavorite = false;
      console.log('isFavorite false');
      saveToLocalStorage(ideas);
    }else {
      console.log('fail');
    }
  }
}

function changeFavoriteImg(index) {
  var star = document.querySelector(".star-img");
  var activeStar = document.querySelector(".star-active-img");

  if (ideas[index].isFavorite) {
    hide(star);
    show(activeStar);
  }else {
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
