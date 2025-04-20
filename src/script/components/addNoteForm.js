import { createNote } from "../utils/api.js";
class AddNoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    const titleInput = this.shadowRoot.querySelector("#titleInput");
    const noteInput = this.shadowRoot.querySelector("#noteInput");
    const titleError = this.shadowRoot.querySelector("#titleError");
    const noteError = this.shadowRoot.querySelector("#noteError");

    // Hapus pesan error saat mulai mengetik
    titleInput.addEventListener("input", () => {
      titleError.textContent = "";
      titleInput.style.border = "none";
    });

    noteInput.addEventListener("input", () => {
      noteError.textContent = "";
      noteInput.style.border = "none";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      const body = noteInput.value.trim();

      // Reset error messages
      titleError.textContent = "";
      noteError.textContent = "";
      titleInput.style.border = "none";
      noteInput.style.border = "none";

      let isValid = true;

      if (title === "") {
        titleError.textContent = "Judul tidak boleh kosong!";
        titleInput.style.border = "2px solid #ff4d4d";
        isValid = false;
      }

      if (body === "") {
        noteError.textContent = "Catatan tidak boleh kosong!";
        noteInput.style.border = "2px solid #ff4d4d";
        isValid = false;
      }

      if (!isValid) return;

      // Create note via API
      try {
        await createNote({ title, body });
        titleInput.value = "";
        noteInput.value = "";
        alert("Catatan berhasil ditambahkan!");
        this.dispatchEvent(new CustomEvent("note-added", { bubbles: true }));
      } catch (error) {
        alert("Gagal menambahkan catatan. Silakan coba lagi.");
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
        } 

        #formContainer {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin: 10px auto;
          text-align: center;
          box-sizing: border-box;
          max-width: 600px;
        }
        
        @media screen and (max-width: 500px) {
          #formContainer {
            min-width: 100%;
          }
        }

        #formContainer h1 {
          font-size: 24px;
          color: white;
          margin-bottom: 20px;
        }

        .formInput {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          text-align: left;
        }

        .formInput label {
          font-weight: bold;
          color: white;
          margin-bottom: 5px;
        }

        #titleInput, 
        #noteInput {
          padding: 10px;
          border-radius: 5px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          color: white;
          font-size: 16px;
          outline: none;
          transition: border 0.3s ease-in-out;
        }

        #titleInput::placeholder, 
        #noteInput::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        #noteInput {
          height: 100px;
          resize: none;
        }

        .error-message {
          color: #ff4d4d;
          font-size: 12px;
          margin-top: 5px;
        }

        #formSubmit {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          font-weight: bold;
          background: rgb(46, 35, 108);
          background: linear-gradient(
            13deg,
            rgb(82, 59, 211) 0%,
            rgb(153, 58, 201) 100%
          );
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.2s ease-in-out, opacity 0.3s;
        }

        #formSubmit:hover {
            transform: scale(1.02); 
            background: linear-gradient(
            13deg,
            rgb(98, 71, 255) 0%,
            rgb(192, 65, 255) 100%
          );
            box-shadow: 0 0px 20px rgba(250, 102, 255, 0.43); 

        }

        @media (max-width: 520px) {
          #formContainer {
            width: 100%;
          }
        }
      </style>

      <div id="formContainer">
        <h1>Tambah Catatan</h1>
        <form>
          <div class="formInput">
            <label for="title">Judul</label>
            <input type="text" id="titleInput" placeholder="Masukkan judul">
            <span id="titleError" class="error-message"></span>
          </div>
          <div class="formInput">
            <label for="note">Tulis Catatan</label>
            <textarea id="noteInput" placeholder="Tulis catatan..."></textarea>
            <span id="noteError" class="error-message"></span>
          </div>
          <button id="formSubmit" type="submit">Tambah</button>
        </form>
      </div>
    `;
  }
}

customElements.define("add-note-form", AddNoteForm);
