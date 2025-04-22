class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                background: rgba(255, 255, 255, 0.2); /* Semi-transparent */
                backdrop-filter: blur(10px); /* Efek kaca */
                text-align: center;
                font-size: 22px;
                display: block;
                padding: 15px;
                border-bottom: 3px solid var(--thirdColor);
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease-in-out;
            }


            h1 {
                margin: 0;
                color: white;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 2px;
                padding: 15px;
                font-size: 1.5em;
            }       
        </style>
                    
        
        <h1>📝Notes App</h1>
    `;
  }
}

customElements.define("app-bar", AppBar);
