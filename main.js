var ideas = [];
var ideaBox;

var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var saveButton = document.querySelector('.locked-button');
var searchIdeasButton = document.querySelector('.search-button');
var searchIdeasInput = document.querySelector('.search-input');
var gridContainer = document.querySelector('.grid-container');
var showFavoriteButton = document.querySelector('.show-filter-button');
var showAllButton = document.querySelector('.show-all-button');
var commentButton = document.querySelector('.comment-img');
var commentField = document.querySelector('.comment-box');


saveButton.addEventListener('click', createIdeaCard);
document.addEventListener('DOMContentLoaded', displayIdeaCard);
inputTitle.addEventListener('keyup', lockSaveButton);
inputBody.addEventListener('keyup', lockSaveButton);
gridContainer.addEventListener('click', changeCard);
showFavoriteButton.addEventListener('click', filterFavorites);
showAllButton.addEventListener('click', showAllIdeas);
searchIdeasInput.addEventListener('keyup', searchIdeas);
commentButton.addEventListener('click', addComment);

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
  showCards();
  // changeFavoriteImg();
  // renderCards();
  clearForm();
  lockSaveButton();
}

function showCards() {
  gridContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    var picture = changeFavoriteImg(ideas[i]);
    renderCards(ideas[i], picture);
  }
}

function changeFavoriteImg(card) {
  var starPicture;
  if (card.isFavorite) {
    return starPicture = "assets/star-active.svg";
  }else {
    return starPicture = "assets/star.svg";
  }
}

function renderCards(card, picture) {
  // gridContainer.innerHTML = '';
  // for (var i = 0; i < ideas.length; i++) {
  //   var starPicture;
  //   if (ideas[i].isFavorite) {
  //     starPicture = "assets/star-active.svg";
  //   }else {
  //     starPicture = "assets/star.svg";
  //   }
    gridContainer.innerHTML += `
      <div class="box">
        <header class="card-header">
          <img src=${picture} class="star-img" id="${card.id}">
          <img src="assets/delete.svg" class="delete-img" id="${card.id}">
        </header>
        <div class="user-idea">
          <h4 class="user-title">${card.title}</h4>
          <p>${card.body}</p>
        </div>
        <footer class="card-footer">
          <img src="assets/comment.svg" class="comment-img">
          <p class="card-comment">Comment</p>
          <div>
            <textarea class="comment-box hidden"></textarea>
          </div>
        </footer>
      </div>`
  // }
}

function changeCard(event) {
  if (event.target.classList.contains('star-img')) {
    favoriteIdeaCard(event.target.id);
  } else if (event.target.classList.contains('delete-img')) {
    deleteIdeaCard(event.target.id);
  } else if (event.target.classList.contains(''))
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
  hide(showFavoriteButton);
  show(showAllButton);
  gridContainer.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].isFavorite) {
      renderCards(ideas[i], changeFavoriteImg(ideas[i]));
    }
  }
  // gridContainer.innerHTML = '';
  // for (var i = 0; i < ideas.length; i++) {
  //   if (ideas[i].isFavorite) {
  //     gridContainer.innerHTML += `
  //       <div class="box">
  //         <header class="card-header">
  //           <img src="assets/star-active.svg" class="star-img" id="${ideas[i].id}">
  //           <img src="assets/delete.svg" class="delete-img" id="${ideas[i].id}">
  //         </header>
  //         <div class="user-idea">
  //           <h4 class="user-title">${ideas[i].title}</h4>
  //           <p>${ideas[i].body}</p>
  //         </div>
  //         <footer class="card-footer">
  //           <img src="assets/comment.svg" class="comment-img">
  //           <p class="card-comment">Comment</p>
  //         </footer>
  //       </div>`
  //   }
  // }
}

function showAllIdeas() {
  hide(showAllButton);
  show(showFavoriteButton);
  displayIdeaCard();
}

function searchIdeas() {
  gridContainer.innerHTML = ''
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].title.includes(searchIdeasInput.value) || ideas[i].body.includes(searchIdeasInput.value)) {
      renderCards(ideas[i], changeFavoriteImg(ideas[i]));
      // gridContainer.innerHTML += `
      //   <div class="box">
      //     <header class="card-header">
      //       <img src="assets/star-active.svg" class="star-img" id="${ideas[i].id}">
      //       <img src="assets/delete.svg" class="delete-img" id="${ideas[i].id}">
      //     </header>
      //     <div class="user-idea">
      //       <h4 class="user-title">${ideas[i].title}</h4>
      //       <p>${ideas[i].body}</p>
      //     </div>
      //     <footer class="card-footer">
      //       <img src="assets/comment.svg" class="comment-img">
      //       <p class="card-comment">Comment</p>
      //     </footer>
      //   </div>`
    }
  }
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

// function addComment() {
//   show(commentField);
// }

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
