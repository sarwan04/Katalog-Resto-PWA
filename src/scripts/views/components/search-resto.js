/* eslint-disable linebreak-style */
class RestaurantSearch extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
        <style>
          .container-search {
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 50%;
            margin: 0 auto;
          }
  
          .search-form {
            display: flex;
            align-items: center;
            border: 1px solid #ced4da;
            border-radius: 4px;
          }
  
          input[type='text'] {
            flex: 1;
            border: none;
            border-radius: 4px 0 0 4px;
            outline: none;
          }
  
          button {
            background-color: #007bff;
            min-width: 44px;
            height: 44px;
            color: #fff;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          button:hover {
            background-color: #0056b3;
          }
  
          .main-title h4 {
            font-family: 'Bad Script', cursive;
            font-size: 35px;
            font-weight: 600;
            text-align: center;
            font-style: normal;
            margin: 10px;
          }

          @media (max-width: 600px) {
            .container-search {
              width: 90%; 
            }
          
            input[type='text'] {
              min-width: 44px;
              min-height: 44px;
            }
          
            button {
              min-width: 44px;
              min-height: 44px;
            }
          
            .main-title h4 {
              font-size: 28px; 
              margin: 5px; /
            }
          }
  
        </style>
        <div class="container-search">
          <div id="main-title" class="main-title">
            <h4>Explore Restaurant</h4>
          </div>
          <form id="searchForm" class="search-form">
            <input type="text" id="searchInput" placeholder="Cari restoran..." />
            <button type="submit" id="searchButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
            </button>
          </form>
        </div>
      `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    const searchForm = shadowRoot.querySelector('#searchForm');
    const searchInput = shadowRoot.querySelector('#searchInput');

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      this.dispatchEvent(new CustomEvent('search', { detail: searchTerm }));
    });
  }
}

customElements.define('restaurant-search', RestaurantSearch);
