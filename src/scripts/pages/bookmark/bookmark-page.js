import {
  generateLoaderAbsoluteTemplate,
  generateStoryItem,
  generateStoryListEmpty,
  generateStoryListError,
} from '../../template';
import BookmarkPresenter from './bookmark-presenter';
import Database from '../../data/database';
import Map from '../../utils/map';

export default class BookmarkPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story-list__map__container">
          <div id="map" class="story-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">List Story Saved</h1>

        <div class="story-list__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  populateBookmarkList(message, storyList) {
    if (storyList.length <= 0) {
      this.populateBookmarkListEmpty();
      return;
    }

    const html = storyList.reduce((accumulator, story) => {
      if (this.#map && story.location && story.location.lat && story.location.lon) {
        const coordinate = [story.location.lat, story.location.lon];
        const markerOptions = { alt: story.name };
        const popupOptions = { content: story.location.placeName };

        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }

      const formattedLocation = story.location.placeName;

      return accumulator.concat(
        generateStoryItem({
          ...story,
          location: formattedLocation,
        }),
      );
    }, '');

    document.getElementById('story-list').innerHTML = `
      <div class="story-list">${html}</div>
    `;
  }

  populateBookmarkListEmpty() {
    document.getElementById('story-list').innerHTML = generateStoryListEmpty();
  }

  populateBookmarkListError(message) {
    document.getElementById('story-list').innerHTML = generateStoryListError(message);
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('story-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-list-loading-container').innerHTML = '';
  }
}
