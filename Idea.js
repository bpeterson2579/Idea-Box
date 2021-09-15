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

  deleteFromStorage(i) {
    ideas.splice(i, 1);
    displayIdeaCard();
  }

  updateIdea(i) {
    if (!this.isFavorite) {
      this.isFavorite = true;
      cardFavorite(i);
    } else {
      console.log('favorite', this.isFavorite);
      this.isFavorite = false;
    }
  }
}
