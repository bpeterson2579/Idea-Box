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
    //delete from storage.
  }
  updateIdea() {
    if (this.isFavorite) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }
}
