class ChatPage extends HTMLElement {
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
                <custom-text variant="title">Chat</custom-text>
                <form class="chat-form">
                    <custom-fieldset></custom-fieldset>
                    <custom-button>Enviar</custom-button>
                </form>
            </div>
        `;
		/* Cambiar el form para poder usar el boton (mismo problema que en el wizard) */

		const style = document.createElement('style');
		style.innerHTML = `
        .content-container{
            padding: 15px 30px;
        }
        .chat-form {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        `;

		this.shadow.appendChild(style);
	}
}
customElements.define('chat-page', ChatPage);
