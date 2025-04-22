import "./loading.js";
import {
  getNotes,
  getSingleNote,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/api.js";
import "./detailNote.js";

const detailNote = document.querySelector("detail-note");
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
        display: block;
        width: 100%;
        max-width: 1250px;
        margin: 0 auto;
      }
      .section {
        margin-bottom: 40px;
        padding: 24px 0 0 0;
      }
      .section-header {
        font-size: 1.6rem;
        font-weight: bold;
        color: #fff;
        background: linear-gradient(90deg, #c34bff 0%, #433d8b 100%);
        padding: 12px 24px;
        border-radius: 12px 12px 0 0;
        margin-bottom: 18px;
        box-shadow: 0 2px 10px rgba(67,61,139,0.08);
        letter-spacing: 1px;
      }
      .notes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 18px;
      }
      .note-card {
        min-height: 200px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(10px);
        padding: 20px;
        box-shadow: 0 4px 18px rgba(67,61,139,0.13);
        color: white;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1.5px solid rgba(195,75,255,0.13);
      }
      .note-card:hover {
        background: rgba(255, 255, 255, 0.28);
        box-shadow: 0 8px 24px rgba(195,75,255,0.13);
        transform: translateY(-2px) scale(1.01);
      }
      hr {
        border: none;
        height: 2px;
        background: linear-gradient(to right, #c34bff, #d8d1ff, transparent);
        margin: 8px 0;
        opacity: 0.5;
      }
      p {
        opacity: 0.8;
        margin-bottom: 0.5em;
      }
      .note-actions {
        display: flex;
        gap: 10px;
        margin-top: 16px;
      }
      button {
        background: linear-gradient(to right, rgba(255,255,255,0.09), rgba(255,255,255,0.11));
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.2s;
        height: 38px;
        padding: 0 10px;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 2px 8px rgba(67,61,139,0.08);
      }
      .detail {
        background: linear-gradient(to right, rgba(0, 174, 255, 0.2), rgba(0, 106, 255, 0.3));
      }
      .delete {
        background: linear-gradient(to right, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.3));
      }
      .archive {
        background: linear-gradient(to right, rgba(255, 255, 0, 0.2), rgba(255, 255, 0, 0.3));
      }
      button:hover {
        transform: scale(1.07);
        opacity: 0.92;
      }
      @media (max-width: 600px) {
        .section-header { font-size: 1.2rem; padding: 10px 12px; }
        .notes-grid { grid-template-columns: 1fr; }
      }
    `;
  }

  async render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this._style);

    if (loadingElement) loadingElement.style.display = "block";

    try {
      const unarchivedData = await getNotes();
      const archivedData = await getArchivedNotes();
      const unarchivedNotes = unarchivedData.data || [];
      const archivedNotes = archivedData.data || [];

      // Unarchived Section
      const unarchivedSection = document.createElement("section");
      unarchivedSection.className = "section";
      unarchivedSection.innerHTML = `<div class="section-header">Unarchived Notes</div>`;
      const unarchivedGrid = document.createElement("div");
      unarchivedGrid.className = "notes-grid";

      unarchivedNotes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <div>
            <h2>${note.title}</h2>
            <hr>
            <p>${note.body}</p>
          </div>
          <div class="note-actions">
            <button class="detail" type="button">Detail</button>
            <button class="archive" type="button">Archive</button>
            <button class="delete" type="button">Hapus</button>
          </div>
        `;
        unarchivedGrid.appendChild(noteCard);

        const detailButton = noteCard.querySelector(".detail");
        const deleteButton = noteCard.querySelector(".delete");
        const archiveButton = noteCard.querySelector(".archive");

        deleteButton.addEventListener("click", async () => {
          await deleteNote(note.id);
          document.querySelector("custom-alert").show("Catatan berhasil dihapus!", "success");
          this.render();
        });

        archiveButton.addEventListener("click", async () => {
          await archiveNote(note.id);
          document.querySelector("custom-alert").show("Catatan berhasil diarsipkan!", "success");
          this.render();
        });

        detailButton.addEventListener("click", async () => {
          const detailData = await getSingleNote(note.id);
          detailNote.show(detailData.data);
        });
      });

      unarchivedSection.appendChild(unarchivedGrid);
      this.shadowRoot.appendChild(unarchivedSection);

      // Archived Section
      const archivedSection = document.createElement("section");
      archivedSection.className = "section";
      archivedSection.innerHTML = `<div class="section-header">Archived Notes</div>`;
      const archivedGrid = document.createElement("div");
      archivedGrid.className = "notes-grid";

      archivedNotes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <div>
            <h2>${note.title}</h2>
            <hr>
            <p>${note.body}</p>
          </div>
          <div class="note-actions">
            <button class="detail" type="button">Detail</button>
            <button class="archive" type="button">Unarchive</button>
            <button class="delete" type="button">Hapus</button>
          </div>
        `;
        archivedGrid.appendChild(noteCard);

        const detailButton = noteCard.querySelector(".detail");
        const deleteButton = noteCard.querySelector(".delete");
        const archiveButton = noteCard.querySelector(".archive");

        deleteButton.addEventListener("click", async () => {
          await deleteNote(note.id);
          document.querySelector("custom-alert").show("Catatan berhasil dihapus!", "success");
          this.render();
        });

        archiveButton.addEventListener("click", async () => {
          await unarchiveNote({ id: note.id, archived: false });
          document.querySelector("custom-alert").show("Catatan berhasil dipulihkan!", "success");
          this.render();
        });

        detailButton.addEventListener("click", async () => {
          const detailData = await getSingleNote(note.id);
          detailNote.show(detailData.data);
        });
      });

      archivedSection.appendChild(archivedGrid);
      this.shadowRoot.appendChild(archivedSection);
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = "Failed to load notes.";
      this.shadowRoot.appendChild(errorMsg);
    } finally {
      if (loadingElement) loadingElement.style.display = "none";
    }
  }
}
customElements.define("note-list-fetch", NoteListFetch);
