import { animate } from "motion";

class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.timeout = null;
  }

  connectedCallback() {
    this.render();
  }

  show(message, type = "info") {
    const alertBox = this.shadowRoot.querySelector(".alert-box");
    const alertText = this.shadowRoot.querySelector(".alert-text");
    alertText.textContent = message;
    alertBox.className = `alert-box ${type}`;
    alertBox.style.display = "block";

    // Animate glassmorphism alert in (pop and fade)
    animate(
      alertBox,
      { opacity: [0, 1], scale: [0.5, 1.1, 1], y: [0, 0] },
      { duration: 0.3, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );

    // Animate text in (slide and fade)
    animate(
      alertText,
      { opacity: [0, 1], x: [0, 0] },
      { duration: 0.7, delay: 0.1, easing: "ease-out" },
    );

    // Hide after 2s with pop-out and text fade
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      animate(
        alertText,
        { opacity: [1, 0], x: [0, 0] },
        { duration: 0.4, easing: "ease-in" },
      );
      animate(
        alertBox,
        { opacity: [1, 0], scale: [1, 0.5], y: [0, 0] },
        { duration: 0.3, easing: "cubic-bezier(0.55, 0, 0.55, 0.2)" },
      ).finished.then(() => {
        alertBox.style.display = "none";
      });
    }, 2000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .alert-box {
          min-width: 260px;
          max-width: 90vw;
          background: rgba(34, 34, 34, 0.25);
          border-radius: 18px;
          font-weight: bold;
          font-size: 1.15rem;
          box-shadow: 0 8px 32px rgba(67,61,139,0.18);
          opacity: 0;
          position: fixed;
          left: 75%;
          top: 90%;
          transform: translate(50%,50%) scale(0.85);
          z-index: 99999;
          display: none;
          pointer-events: none;
          text-align: center;
          letter-spacing: 0.5px;
          color: #fff;
          padding: 22px 36px;
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1.5px solid rgba(255,255,255,0.18);
          transition: box-shadow 0.3s;
        }
        .alert-box.success { 
          background: rgba(67, 233, 123, 0.25);
          border: 1.5px solid rgba(67, 233, 123, 0.25);
        }
        .alert-box.error { 
          background: rgba(255, 88, 88, 0.25);
          border: 1.5px solid rgba(255, 88, 88, 0.25);
        }
        .alert-box.info { 
          background: rgba(195, 75, 255, 0.25);
          border: 1.5px solid rgba(195, 75, 255, 0.25);
        }
        .alert-text {
          display: inline-block;
          opacity: 0;
          font-size: 1.15rem;
          font-weight: bold;
          text-shadow: 0 2px 8px rgba(0,0,0,0.13);
          letter-spacing: 0.5px;
          transition: opacity 0.3s;
        }
      </style>
      <div class="alert-box">
        <span class="alert-text"></span>
      </div>
    `;
  }
}

customElements.define("custom-alert", CustomAlert);
