import './loading.js';
import { getNotes } from "../utils/api.js";

const loadingElement = document.querySelector('loading-app');



class NoteListFetch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
    document.addEventListener("note-added", () => this.render());
  }

  updateStyle() {
    this._style.textContent = `
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 10px;
        width: 100%;
        max-width: 1250px;
        
      }

      .note-card {
        width: auto;
        height: 200px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2); 
        backdrop-filter: blur(10px); 
        padding: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        color: white;
        transition: all 0.3s ease-in-out;
      }

      hr{
        border: none; 
        height: 2px;
        background: linear-gradient(to right,rgb(195, 75, 255), rgb(216, 209, 255),  transparent); /* Efek gradasi */
        margin: 0px 0px;
        opacity: 0.5;
      }

      p{
        opacity: 70%;
      }
      .note-card:hover {
        transform: scale(1.02); 
        background: rgba(255, 255, 255, 0.3); 
        box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2); 
        
      }
    `;
  }

  async render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = ""; 
    this.shadowRoot.appendChild(this._style);

    if (loadingElement) loadingElement.style.display = 'block'; // Show loading

    try {

      const data = await getNotes();
      const notes = data.data || []; // Adjust based on your API response structure

      notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <h2>${note.title}</h2>
          <hr>
          <p>${note.body}</p>
        `;
        this.shadowRoot.appendChild(noteCard);
      });
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = "Failed to load notes.";
      this.shadowRoot.appendChild(errorMsg);
    } finally {
      if (loadingElement) loadingElement.style.display = 'none'; // Hide loading
    }
  }
}
customElements.define("note-list-fetch", NoteListFetch);
