class BackToTop extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <a id="backToTopButton" href="#">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="24.5" fill="#26413C" stroke="white" />
                <path d="M25 33.75V16.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.25 25L25 16.25L33.75 25" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </a>
        `
    }
}

customElements.define('backtotop-component', BackToTop)