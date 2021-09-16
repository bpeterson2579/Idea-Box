class Idea {
  constructor(ideaTitle, ideaBody) {
    this.title = ideaTitle;
    this.body = ideaBody;
    this.isFavorite = false;
    this.id = Date.now();
  }

  saveToStorage() {
    ideas.push(this);
  }

  deleteFromStorage(i) {
    ideas.splice(i, 1);
    displayIdeaCard();
  }

  updateIdea(i) {
    if (!this.isFavorite) {
      this.isFavorite = true;

    } else {
      this.isFavorite = false;
    }
  }
}
