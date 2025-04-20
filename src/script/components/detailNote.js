class DetailNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.note = null;
  }

  show(note) {
    this.note = note;
    this.render();
    this.style.display = "flex";
  }

  hide() {
    this.style.display = "none";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          z-index: 9999;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          color: white;
          font-size: 20px;
          background: rgba(0, 0, 0, 0.5);
          display: none;
          align-items: center;
          justify-content: center;
        }
        .detail-box {
          background: rgba(34, 34, 34, 0.35);
          border-radius: 24px;
          padding: 40px 32px 32px 32px;
          min-width: 320px;
          max-width: 40vw;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1.5px solid rgba(255,255,255,0.18);
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 18px;
          right: 24px;
          background: rgba(255,255,255,0.12);
          border: none;
          color: #fff;
          font-size: 2rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: rgba(255,255,255,0.25);
        }
        h2 {
          margin-top: 0;
          margin-bottom: 0px;
          font-size: 2rem;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        p {
          font-size: 1.1rem;
          color: #f3eaff;
          margin-bottom: 18px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.10);
        }
        small {
          color: #e0d7ff;
          opacity: 0.4;
        }
      </style>
      <div class="detail-box">
        <button class="close-btn" title="Tutup">&times;</button>
        ${
          this.note
            ? `
          <h2>${this.note.title}</h2>
          
          <p>${this.note.body}</p>
          <hr>
          <small>Dibuat: ${new Date(
            this.note.createdAt
          ).toLocaleString()}</small>

        `
            : `<h2>Detail Note</h2>`
        }
      </div>
    `;

    // Close button event
    this.shadowRoot
      .querySelector(".close-btn")
      .addEventListener("click", () => this.hide());
  }
}

customElements.define("detail-note", DetailNote);
