import { showFormattedDate } from './utils';

export function generateLoaderTemplate() {
  return `
     <div class="loader"></div>
   `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
     <div class="loader loader-absolute"></div>
   `;
}

export function generateMainNavigation() {
  return `
     <li><a id="story-list-button" class="story-list-button" href="#/">List Story</a></li>
     <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Story Saved</a></li>
   `;
}

export function generateUnauthenticatedNavigation() {
  return `
     <li id="push-notification-tools" class="push-notification-tools"></li>
     <li><a id="login-button" href="#/login">Login</a></li>
     <li><a id="register-button" href="#/register">Register</a></li>
   `;
}

export function generateAuthenticatedNavigation() {
  return `
     <li id="push-notification-tools" class="push-notification-tools"></li>
     <li><a id="new-list-button" class="btn new-list-button" href="#/new">Add Story<i class="fas fa-plus"></i></a></li>
     <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
   `;
}

export function generateStoryListEmpty() {
  return `
     <div id="list-empty" class="list__empty">
       <h2>Tidak ada story yang tersedia</h2>
       <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
     </div>
   `;
}

export function generateStoryListError(message) {
  return `
     <div id="list-error" class="list__error">
       <h2>Terjadi kesalahan pengambilan list story</h2>
       <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
     </div>
   `;
}

export function generateStoryDetailError(message) {
  return `
     <div id="list-detail-error" class="list-detail__error">
       <h2>Terjadi kesalahan pengambilan detail story</h2>
       <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
     </div>
   `;
}

export function generateStoryItem({ id, name, description, photoUrl, createdAt, location }) {
  return `
     <div tabindex="0" class="story-item" data-storyid="${id}">
       <img class="story-item__image" src="${photoUrl}" alt="${name}">
       <div class="story-item__body">
         <div class="story-item__main">
           <div class="story-item__more-info">
             <div class="story-item__createdat">
               <i class="fas fa-calendar-alt"></i> ${showFormattedDate(createdAt, 'id-ID')}
             </div>
             <div class="story-item__location">
               <i class="fas fa-map"></i> ${location}
             </div>
           </div>
         </div>
         <div id="story-description" class="story-item__description">
           ${description}
         </div>
         <div class="story-item__more-info">
           <div class="story-item__author">
             Dilaporkan oleh: ${name}
           </div>
         </div>
         <a class="btn story-item__read-more" href="#/story/${id}">
           Selengkapnya <i class="fas fa-arrow-right"></i>
         </a>
       </div>
     </div>
   `;
}

export function generateStoryDetailImage(imageUrl = null, alt = '') {
  if (!imageUrl) {
    return `
       <img class="story-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
     `;
  }

  return `
     <img class="story-detail__image detail-image" src="${imageUrl}" alt="${alt}">
   `;
}

export function generateStoryDetail({ name, description, photoUrl, createdAt, location }) {
  const createdAtFormatted = showFormattedDate(createdAt, 'id-ID');
  const imagesHtml = generateStoryDetailImage(photoUrl, name);

  const placeName = location && location.placeName ? location.placeName : 'Lokasi tidak tersedia';
  const lat = location && location.lat ? location.lat : 'Tidak tersedia';
  const lon = location && location.lon ? location.lon : 'Tidak tersedia';

  const briefDescription = description.substring(0, 30);

  return `
      <div class="story-detail__header">
        <h1 class="story-detail__title">${briefDescription}</h1>
        <div class="story-detail__more-info">
          <div class="story-detail__more-info__inline">
            <div id="createdat" class="story-detail__createdat"><i class="fas fa-calendar-alt"></i> ${createdAtFormatted}</div>
            <div id="location-place-name" class="story-detail__location__place-name" data-value="${placeName}"><i class="fas fa-map"></i> ${placeName}</div>
          </div>
          <div class="story-detail__more-info__inline">
          <div id="location-latitude" class="story-detail__location__latitude" data-value="${lat}">Latitude: ${lat}</div>
          <div id="location-longitude" class="story-detail__location__longitude" data-value="${lon}">Longitude: ${lon}</div>
          </div>
          <div id="author" class="story-detail__author">Dilaporkan oleh: ${name}</div>
        </div>
      </div>

      <div class="container detail-content">
        <div class="story-detail__images__container">
          <div id="images" class="story-detail__images">${imagesHtml}</div>
        </div>

        <div class="story-detail__body">
          <div class="story-detail__body__description__container">
            <h2 class="story-detail__description__title">Informasi Lengkap</h2>
            <div id="description" class="story-detail__description__body">
              ${description}
            </div>
          </div>
          <div class="story-detail__body__map__container">
            <h2 class="story-detail__map__title">Peta Lokasi</h2>
            <div class="story-detail__map__container">
              <div id="map" class="story-detail__map"></div>
              <div id="map-loading-container"></div>
            </div>
          </div>

          <hr>

          <div class="story-detail__body__actions__container">
            <h2>Aksi</h2>
            <div class="story-detail__actions__buttons">
              <div id="save-actions-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

export function generateSubscribeButton() {
  return `
     <button id="subscribe-button" class="btn subscribe-button">
       Subscribe <i class="fas fa-bell"></i>
     </button>
   `;
}

export function generateUnsubscribeButton() {
  return `
     <button id="unsubscribe-button" class="btn unsubscribe-button">
       Unsubscribe <i class="fas fa-bell-slash"></i>
     </button>
   `;
}

export function generateSaveStoryButtonTemplate() {
  return `
     <button id="story-detail-save" class="btn btn-transparent">
       Simpan Story <i class="far fa-bookmark"></i>
     </button>
   `;
}

export function generateRemoveStoryButtonTemplate() {
  return `
    <button id="story-detail-remove" class="btn btn-transparent">
      Buang Story <i class="fas fa-bookmark"></i>
    </button>
  `;
}

export function generateNotFoundTemplate() {
  return `
    <div class="not-found-container">
      <h1 class="not-found-title">404 - Halaman Tidak Ditemukan</h1>
      <p class="not-found-description">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
        Kemungkinan alamat yang Anda masuki salah atau halaman sudah dihapus.
      </p>
      <a href="#/" class="not-found-link">Kembali ke Halaman Utama</a>
    </div>
  `;
}
