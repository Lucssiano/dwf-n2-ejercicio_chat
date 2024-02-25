class HomePage extends HTMLElement {
	shadow: ShadowRoot;
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.render();
	}
	render() {
		this.shadow.innerHTML = `
        <custom-header></custom-header>
        <div class="content-container">
            <custom-text variant="title">Bienvenido</custom-text>
            <form class="home-form">
                <custom-fieldset>Tu nombre: </custom-fieldset>
                <custom-button>Comenzar</custom-button>
            </form>
        </div>
        `;
		/* Poner el label como un fieldset component */
		/* Cambiar el form para poder usar el boton (mismo problema que en el wizard) */

		const style = document.createElement('style');
		style.innerHTML = `
        .content-container{
            padding: 15px 30px;
        }
        .home-form{
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        `;

		this.shadow.appendChild(style);
	}
}
customElements.define('home-page', HomePage);
