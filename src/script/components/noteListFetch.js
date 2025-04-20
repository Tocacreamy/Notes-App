import "./loading.js";
import { getNotes, getSingleNote } from "../utils/api.js";
import "./detailNote.js";

const detailNote = document.querySelector("detail-note");
const moreIcon = "./src/assets/more.png";
const loadingElement = document.querySelector("loading-app");

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
        height: auto;
        min-height: 200px;
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
        background: rgba(255, 255, 255, 0.3); 
        box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2); 
        
      }

      .detail {
        background: linear-gradient(to right, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.11));
        color: white; 
        border: none; 
        cursor: pointer; /* Change cursor to pointer on hover */
        border-radius: 3px; /* Rounded corners */
        transition: all 0.3s ease-in-out; 
      }

      .detail:hover {
        background: linear-gradient(to right,rgba(50, 22, 206, 0.32), rgba(195, 75, 255, 0.24));
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
      }
    `;
  }

  async render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this._style);

    if (loadingElement) loadingElement.style.display = "block"; // Show loading

    try {
      const data = await getNotes();
      const notes = data.data || [];

      notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <button class="detail" type="button"><img src="${moreIcon}" alt="More options"></button>
          <h2>${note.title}</h2>
          <hr>
          <p>${note.body}</p>
        `;
        this.shadowRoot.appendChild(noteCard);
        const button = noteCard.querySelector(".detail");
        button.addEventListener("click", async () => {
          // Fetch single note by id
          const detailData = await getSingleNote(note.id);
          // Show detail in the overlay
          detailNote.show(detailData.data); // We'll add a show() method to detailNote
        });
      });
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = "Failed to load notes.";
      this.shadowRoot.appendChild(errorMsg);
    } finally {
      if (loadingElement) loadingElement.style.display = "none"; // Hide loading
    }
  }
}
customElements.define("note-list-fetch", NoteListFetch);
