import "./loading.js";
import { getNotes, getSingleNote, deleteNote } from "../utils/api.js";
import "./detailNote.js";

const detailNote = document.querySelector("detail-note");
const loadingElement = document.querySelector("loading-app");

class NoteListFetch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.showArchive = false;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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

      button {
        background: linear-gradient(to right, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.11));
        color: white; 
        border: none; 
        cursor: pointer; /* Change cursor to pointer on hover */
        border-radius: 3px; /* Rounded corners */
        transition: all 0.3s ease-in-out; 
        height: 40px;
      }

      .detail {
        background: linear-gradient(to right, rgba(0, 174, 255, 0.2), rgba(0, 106, 255, 0.3));
      }
      .delete {
        background: linear-gradient(to right, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.3));
      }

      button:hover {
        transform: scale(1.05); /* Slightly enlarge the button on hover */
      }
    `;
  }

  async render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this._style);


    if (loadingElement) loadingElement.style.display = "block"; 

    try {

      const data = await getNotes();
      const notes = data.data || [];

      notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <div>
            <h2>${note.title}</h2>
            <hr>
            <p>${note.body}</p>
          </div>
          <div>
            <button class="detail" type="button">Detail</button>
            <button class="delete" type="button">Hapus</button>
          </div>
        `;
        this.shadowRoot.appendChild(noteCard);
        const detailButton = noteCard.querySelector(".detail");
        const deleteButton = noteCard.querySelector(".delete");

        deleteButton.addEventListener("click", async () => {
          await deleteNote(note.id);
          alert("Catatan berhasil dihapus!");
          this.render();
        });

        detailButton.addEventListener("click", async () => {
          const detailData = await getSingleNote(note.id);
          detailNote.show(detailData.data); 
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
