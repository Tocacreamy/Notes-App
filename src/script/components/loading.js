class Loading extends HTMLElement {
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
        :host{
            display: block;
            width: fit-content ;
            height: fit-content;
            border-radius: 16px;
            background: rgba(255,255,255,0.15);
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            animation: fadein 0.5s infinite alternate;
        }
        h1{
            color: white;
            padding: 0px 10px;
        }
        @keyframes fadein {
            from { opacity: 0.5; }
            to { opacity: 1; }
        }
    
    </style>

    <h1>Loading...</h1>
    
    `;
  }
}

customElements.define("loading-app", Loading);
