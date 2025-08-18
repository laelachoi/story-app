import { storyMapper } from '../../data/api-mapper';

export default class HomePresenter {
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

      if (!response.ok) {
        console.error('initialGalleryAndMap: response:', response);
        this.#view.populateStoryListError(response.message);
        return;
      }

      const locationStories = await Promise.all(
        response.listStory.map(async (story) => {
          return await storyMapper(story);
        }),
      );

      this.#view.populateStoryList(response.message, locationStories);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
