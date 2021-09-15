class Idea {
  constructor(ideaTitle, ideaBody) {
    this.title = ideaTitle;
    this.body = ideaBody;
    this.isFavorite = false;
    this.id = Date.now();
  }

  saveToStorage(instance) {
    ideas.push(instance);
  }

  deleteFromStorage() {
    for (var i = 0; i < ideas.length; i++) {
      if (this.id === ideas[i].id) {
        ideas.splice(i, 1);
      }
    }
    displayIdeaCard();
  }

  updateIdea() {
    if (this.isFavorite) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }
}
