var ideas = [];
var ideaBox;

var commentBox = document.getElementById('commentBox');
var commentInput = document.getElementById('commentInput');
var commentSaveButton = document.getElementById('commentSaveButton');
var commentTitle = document.getElementById('commentTitle');
var gridContainer = document.getElementById('gridContainer');
var inputBody = document.getElementById('bodyInput');
var inputTitle = document.getElementById('titleInput');
var saveButton = document.getElementById('lockedButton');
var searchIdeasInput = document.getElementById('searchInput');
var showFavoriteButton = document.getElementById('showFilterButton');
var showAllButton = document.getElementById('showAllButton');

saveButton.addEventListener('click', createIdeaCard);
document.addEventListener('DOMContentLoaded', displayIdeaCard);
inputTitle.addEventListener('keyup', lockSaveButton);
inputBody.addEventListener('keyup', lockSaveButton);
gridContainer.addEventListener('click', changeCard);
showFavoriteButton.addEventListener('click', filterFavorites);
showAllButton.addEventListener('click', showAllIdeas);
searchIdeasInput.addEventListener('keyup', searchIdeas);
commentSaveButton.addEventListener('click', saveComment);


function createIdeaCard() {
  event.preventDefault();

  ideaBox = new Idea(inputTitle.value, inputBody.value,);
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
  } else {
    return starPicture = "assets/star.svg";
  }
}

function renderCards(card, picture) {
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
          <img src="assets/comment.svg" class="comment-img" id="${card.id}">
          <p class="card-comment">Comment</p>
          <p class="user-comment">${card.comments}</p>
        </footer>
      </div>`
}

function changeCard(event) {
  if (event.target.classList.contains('star-img')) {
    favoriteIdeaCard(event.target.id);
  } else if (event.target.classList.contains('delete-img')) {
    deleteIdeaCard(event.target.id);
  } else if (event.target.classList.contains('comment-img')) {
    addCommentField(event.target.id);
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
      } else if (ideas[i].id === Number(id) && ideas[i].isFavorite) {
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

  function addCommentField(id) {
    var addComment = document.createElement
    show(commentBox);
    for(var i = 0; i < ideas.length; i++) {
      if(ideas[i].id === Number(id)) {
        commentTitle.innerText = ideas[i].title;
      }
      //am work
    }
  }

  function saveComment() {
    event.preventDefault();
    var comment = new Comment(commentInput.value)
    for(var i = 0; i < ideas.length; i++) {
      if(ideas[i].title === commentTitle.innerText) {
        ideas[i].comments.push(comment);
        saveToLocalStorage(ideas);
        displayIdeaCard();
      }
    }
  }

  // Need to access the section of card we want to insert comment Box
  // Need to check that the comment box is on the card we clicked
  // When user adds comment, should create new instance of comment class
  // which is assigned to the proper idea object.
  // Comment is then displayed underneath the card.

  function show(element) {
    element.classList.remove('hidden');
  }

  function hide(element) {
    element.classList.add('hidden');
  }
