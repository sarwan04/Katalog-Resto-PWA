/* eslint-disable no-console */
/* eslint-disable no-undef */
import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/restodb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto"></div>
      <div id="customerReviews"></div>
      <div id="likeButtonContainer"></div>
      <div id="customerReviewForm">
        <h3>Add Review</h3>
        <form id="reviewForm">
          <div>
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div>
            <label for="review">Your Review:</label>
            <textarea id="review" name="review" rows="4" required></textarea>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurant = await TheRestoDbSource.detailResto(url.id);
      const restoContainer = document.querySelector('#resto');
      restoContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          description: restaurant.description,
        },
      });

      const reviewForm = document.querySelector('#reviewForm');
      const reviewsContainer = document.querySelector('#customerReviews');

      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(reviewForm);
        const name = formData.get('name');
        const reviewText = formData.get('review');

        const reviewData = {
          id: restaurant.id,
          name,
          review: reviewText,
        };

        try {
          const response = await fetch('https://restaurant-api.dicoding.dev/review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
          });

          const data = await response.json();
          if (!data.error) {
            const newReviewElement = document.createElement('div');
            newReviewElement.innerHTML = `
              <strong>${name}</strong>
              <p>${reviewText}</p>
              <small>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
            `;

            reviewsContainer.prepend(newReviewElement);

            reviewForm.reset();
          } else {
            console.error('Failed to add review:', data.message);
          }
        } catch (error) {
          console.error('Error adding review:', error);
        }
      });
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  },
};

export default Detail;
