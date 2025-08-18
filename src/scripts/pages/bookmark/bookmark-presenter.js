import { storyMapper } from '../../data/api-mapper';

export default class BookmarkPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoryListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showStoryListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    this.#view.showLoading();

    try {
      await this.showStoryListMap();

      const response = await this.#model.getAllStory();
      const stories = await Promise.all(response.map(storyMapper));

      const message = 'Berhasil mendapatkan list story tersimpan.';
      this.#view.populateBookmarkList(message, stories);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateBookmarkListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
