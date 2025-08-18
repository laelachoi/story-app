import {
  generateLoaderAbsoluteTemplate,
  generateStoryItem,
  generateStoryListEmpty,
  generateStoryListError,
} from '../../template';
import HomePresenter from './home-presenter';
import * as StoryAPI from '../../data/api';
import Map from '../../utils/map';

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story__map__container">
          <div id="map" class="story__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">List Story</h1>

        <div class="story__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  populateStoryList(message, storyList) {
    if (storyList.length <= 0) {
      this.populateStoryListEmpty();
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

  populateStoryListEmpty() {
    document.getElementById('story-list').innerHTML = generateStoryListEmpty();
  }

  populateStoryListError(message) {
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
