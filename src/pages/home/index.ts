import { Router } from '@vaadin/router';
import { state } from '../../state';

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
                <label> <custom-text>Tu nombre:</custom-text> <input type="text" class="fieldset-input" required> </label>
                <button class="submit-button"><custom-text variant="large">Comenzar</custom-text></button>
            </form>
        </div>
        `;
		/* No puedo usar los componentes button y fieldset porque no se lleva bien con el form */
		/* Para el button podría hacer un custom event que cuando haga click en el componente se dispare el submit del form, pero para el fieldset no se me ocurriria como */

		const formEl = this.shadow.querySelector('.home-form');
		formEl.addEventListener('submit', (e) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const inputValue = (form.querySelector('.fieldset-input') as HTMLInputElement).value;
			state.setName(inputValue);
			Router.go('/chat');
		});

		const style = document.createElement('style');
		style.innerHTML = `
        * {
            box-sizing: border-box;
        }
        .content-container{
            padding: 15px 30px;
        }
        .home-form{
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
customElements.define('home-page', HomePage);
