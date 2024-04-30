/* eslint-disable no-underscore-dangle */
import imghero from '../../../public/images/heros/hero-image_4.jpg';

class HeroPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .hero {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imghero});
          width: 100%;
          min-height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
        }

        .hero-content {
          padding: 20px;
        }

        .hero h1 {
          font-weight: 700;
          font-family: 'Bad Script', cursive;
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 24px;
          margin-bottom: 0;
        }
      </style>

      <div class="hero">
        <div class="hero-content">
          <h1><span>Temukan Kuliner Favoritemu Bersama Kami</span></h1>
          <p>Kami selalu menyediakan yang terbaik</p>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-page', HeroPage);
