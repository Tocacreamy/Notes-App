class Loading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.style.display = "none"; // Default: hidden
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          background: rgba(34, 34, 34, 0.18);
          backdrop-filter: blur(8px) saturate(160%);
          -webkit-backdrop-filter: blur(8px) saturate(160%);
          transition: opacity 0.2s;
        }
        .loading-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 48px;
          border-radius: 22px;
          background: rgba(255,255,255,0.18);
          box-shadow: 0 8px 32px rgba(67,61,139,0.18);
          border: 1.5px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid rgba(255,255,255,0.25);
          border-top: 5px solid #c34bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 18px;
        }
        .loading-text {
          color: #fff;
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.13);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="loading-box">
        <div class="spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>
    `;
  }
}

customElements.define("loading-app", Loading);
