/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import RestaurantSource from '../../data/restodb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <style>
        h2 {
          justify-content: center;
        }
      </style>
      <hero-page></hero-page>
      <restaurant-search></restaurant-search>
      <div class="content">
        <div id="restos" class="restos">
          <p>Loading...</p>
        </div>
        <p id="error-message" style="display: none; color: red;">Failed to load restaurants. Please try again later.</p>
      </div>
      <contact-form></contact-form>
    `;
  },

  async afterRender() {
    this._renderRestaurants();

    const searchComponent = document.querySelector('restaurant-search');
    searchComponent.addEventListener('search', async (event) => {
      const searchQuery = event.detail.toLowerCase();
      await this._renderRestaurants(searchQuery);
    });
  },

  async _renderRestaurants(searchQuery = '') {
    const restosContainer = document.querySelector('#restos');
    const errorMessage = document.querySelector('#error-message');

    try {
      restosContainer.innerHTML = '<p>Loading...</p>';
      errorMessage.style.display = 'none';

      const restos = await RestaurantSource.home();
      restosContainer.innerHTML = '';

      restos.forEach((resto) => {
        if (
          resto.name.toLowerCase().includes(searchQuery) ||
          resto.city.toLowerCase().includes(searchQuery) ||
          resto.description.toLowerCase().includes(searchQuery) ||
          resto.id.toLowerCase().includes(searchQuery) ||
          resto.rating.toString().includes(searchQuery) ||
          resto.pictureId.toLowerCase().includes(searchQuery)
        ) {
          restosContainer.innerHTML += createRestaurantItemTemplate(resto);
        }
      });

      if (restosContainer.innerHTML === '') {
        restosContainer.innerHTML = '<p>Restoran tidak ditemukan</p>';
      }
    } catch (error) {
      console.error('Error rendering restaurants:', error);
      restosContainer.innerHTML = '';
      errorMessage.style.display = 'block';
    }
  },
};

export default Home;
