class AppFooter extends HTMLElement {
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
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: white;
                    text-align: center;
                    padding: 50px;
                    font-size: 14px;

                }
                
                a {
                    color: #ffcc00;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }
                p{
                    margin: auto;
                    background-color: var(--primaryColor);
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    padding: 50px;

                }

            </style>
            
            <p>&copy; 2025 MyNotes App | Created by <a href="#">Zekothok</a></p>
            
        `;
  }
}

customElements.define("app-footer", AppFooter);
