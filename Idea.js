class Idea {
  constructor(ideaTitle, ideaBody) {
    this.title = ideaTitle;
    this.body = ideaBody;
    this.isFavorite = false;
    this.id = Date.now();
    this.comments = [];
  }

  saveToStorage() {
    ideas.push(this);
    saveToLocalStorage(ideas);
  }

  deleteFromStorage(i) {
    ideas.splice(i, 1);
  }

  updateIdea() {
    if (!this.isFavorite) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }
}
