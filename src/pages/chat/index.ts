import { state } from '../../state';

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
                <div class="chat-container">
                    
                </div>
                <form class="chat-form">
                    <input type="text" class="fieldset-input" required>
                    <button class="submit-button"><custom-text variant="large">Enviar</custom-text></button>
                </form>
            </div>
        `;

		/* No puedo usar los componentes button y fieldset porque no se lleva bien con el form */
		/* Ver como hacer para que se vea como un mensaje mio o de otro */
		/* Para el button podría hacer un custom event que cuando haga click en el componente se dispare el submit del form, pero para el fieldset no se me ocurriria como */
		const formEl = this.shadow.querySelector('.chat-form');
		formEl.addEventListener('submit', (e) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const inputValue = (form.querySelector('.fieldset-input') as HTMLInputElement).value;
			state.pushMessage(inputValue);
			form.reset();
		});

		const style = document.createElement('style');
		style.innerHTML = `
        * {
            box-sizing: border-box;
        }
        .content-container{
            padding: 15px 30px;
        }
        .chat-form {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .submit-button {
            cursor: pointer;
            border: none;
            border-radius: 4px;
            padding: 15px 0;		
            text-align: center;		
            width: 100%;
            background-color:#9CBBE9;		
        }
        .fieldset-input {
            height: 30px;
            border: 1px solid #000;
            border-radius: 4px;
            width: 100%;
        }
        `;

		this.shadow.appendChild(style);
	}
}
customElements.define('chat-page', ChatPage);
