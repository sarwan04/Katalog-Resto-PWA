/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import CONFIG from '../../globals/config';

function categoriesRestaurant(restaurant) {
  return restaurant.categories
    .map(
      (category) => `
  <li>${category.name}</li>
  `,
    )
    .join('');
}

function foodsRestaurant(restaurant) {
  return restaurant.menus.foods
    .map(
      (food) => `
  <li>${food.name}</li>
  `,
    )
    .join('');
}

function customerReviews(restaurant) {
  return restaurant.customerReviews
    .map(
      (reviews) => `
  <li class="review">
    <div class="name-review">${reviews.name}</div>
    <div class="description-review">" ${reviews.review} "</div>
    <div class="date-review">${reviews.date}</div>
  </li>
  `,
    )
    .join('');
}

function drinksRestaurant(restaurant) {
  return restaurant.menus.drinks
    .map(
      (drink) => `
  <li>${drink.name}</li>
  `,
    )
    .join('');
}

const createRestaurantDetailTemplate = (restaurant) => `
    <style>
      .resto-item__content__city {
        margin-left: 5px;
        display: inline-block;
        position:absolute;
        padding: 0px;
      }
    </style>
    <h2 class="resto__title">${restaurant.name}</h2>
    <img class="resto__poster" alt="${restaurant.name}"
        src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
        alt="${restaurant.name}">
    <div class="resto__info">
    <h3>Information</h3>
    <p>${restaurant.name}</p>
    <h4>Rating</h4>
    <p>⭐️<span class="resto-item__header__rating__score">${restaurant.rating}</span></p>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>City</h4>
    <p><i class="material-icons">&#xe563;</i><span class="resto-item__content__city">${
      restaurant.city
    }</span></p>
  </div>

  <div class="resto__overview">
  <h4>Description</h4>
  <p>${restaurant.description}</p>
  </div>

  <div class="restaurant-menu">
        <h4 class="restaurant-label">Categories</h4>
        <ul class="chips"> ${categoriesRestaurant(restaurant)}</ul>
        <h4 class="restaurant-label">Foods Menu</h4>
        <ul class="chips"> ${foodsRestaurant(restaurant)}</ul>
        <h4 class="restaurant-label">Drinks Menu</h4>
        <ul class="chips"> ${drinksRestaurant(restaurant)}</ul>
    </div>

  <div class="resto__overview">
    <h4 ">Customer Reviews</h2>
    <ul class="review-boxs"> ${customerReviews(restaurant)}</ul>
  </div>
  
`;

const createRestaurantItemTemplate = (restaurant) => `
<div class="resto-item">
<div class="resto-item__header">
  <img class="resto-item__header__poster" alt="${restaurant.name}" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
  <p class="resto-item__header__city">${restaurant.city}</p>
  </div>
  <div class="resto-item__content">
  <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
  <div class="resto-item__header__rating">
    <p><span class="resto-item__header__rating__text">Rating</span><span class="resto-item__header__rating__score">⭐️${restaurant.rating}</span></p>
  </div>
  <p class="resto-item__description">${restaurant.description}</p>
</div>
</div>

  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
