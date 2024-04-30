/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
class ContactForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          .contact-form-container {
            font-family: Poppins, sans-serif;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            width: 50%; 
            margin: 0 auto; 
            box-sizing: border-box; 
          }
          h4 {
            margin-bottom: 15px;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }
          input[type="text"],
          input[type="email"],
          textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
            height: 44px;
            min-width: 44px;
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            height: 44px;
            min-width: 44px;
            width: 100%; 
          }
          button:hover {
            background-color: #0056b3;
          }

          @media (max-width: 600px) {
            .contact-form-container {
              width: 90%; 
              padding: 10px;
            }
        </style>
        <div class="contact-form-container">
          <h4>Contact Us</h4>
          <form class="contact-form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      `;
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('.contact-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.shadowRoot.querySelector('#name').value;
    const email = this.shadowRoot.querySelector('#email').value;
    const message = this.shadowRoot.querySelector('#message').value;

    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    this.resetForm();
  }

  resetForm() {
    const form = this.shadowRoot.querySelector('.contact-form');
    form.reset();
  }
}

customElements.define('contact-form', ContactForm);
