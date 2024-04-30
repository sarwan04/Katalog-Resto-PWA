/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import FavoriteMovieIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <restaurant-search></restaurant-search>
        <h2 class="content__heading">Your Liked Resto</h2>
        <div id="restos" class="restos">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const searchComponent = document.querySelector('restaurant-search');
    searchComponent.addEventListener('search', async (event) => {
      const searchQuery = event.detail.toLowerCase();
      await this._renderRestaurants(searchQuery);
    });

    await this._renderRestaurants();
  },

  async _renderRestaurants(searchQuery = '') {
    try {
      const restos = await FavoriteMovieIdb.getAllRestos();
      const restosContainer = document.querySelector('#restos');
      restosContainer.innerHTML = '';

      if (restos.length === 0) {
        return;
      }

      const filteredRestos = restos.filter((resto) => {
        return (
          resto.name.toLowerCase().includes(searchQuery) ||
          resto.city.toLowerCase().includes(searchQuery) ||
          resto.description.toLowerCase().includes(searchQuery) ||
          resto.id.toLowerCase().includes(searchQuery) ||
          resto.rating.toString().includes(searchQuery) ||
          resto.pictureId.toLowerCase().includes(searchQuery)
        );
      });

      if (filteredRestos.length > 0) {
        filteredRestos.forEach((resto) => {
          restosContainer.innerHTML += createRestaurantItemTemplate(resto);
        });
      } else {
        restosContainer.innerHTML = '<p>Restoran tidak ditemukan</p>';
      }
    } catch (error) {
      console.error('Error rendering favorite restaurants:', error);
    }
  },
};

export default Like;
