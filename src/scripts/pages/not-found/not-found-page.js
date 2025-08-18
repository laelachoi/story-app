export default class NotFoundPage {
  async render() {
    return `
      <section class="not-found">
        <div class="not-found__container">
          <h2 class="not-found__title">404 - Page Not Found</h2>
          <p class="not-found__message">Halaman yang kamu cari tidak tersedia.</p>
          <a href="#/" class="btn">Kembali ke Beranda</a>
        </div>
      </section>
    `;
  }

  afterRender() {
    console.log('NotFoundPage rendered');
  }
}
