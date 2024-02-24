export function initButtonComponent() {
	class ButtonComponent extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		render() {
			const shadow = this.attachShadow({ mode: 'open' });

			const button = document.createElement('button');
			this.textContent == 'Volver' ? (button.className = 'go-back-button') : (button.className = 'submit-button');

			button.innerHTML = `
					<custom-text variant="large">${this.textContent}</custom-text>
			`;

			const style = document.createElement('style');
			style.textContent = `
						* {
							box-sizing: border-box;
						}
						.submit-button, .go-back-button {
							cursor: pointer;
              border: none;
							border-radius: 4px;
              padding: 15px 0;		
              text-align: center;		
              width: 100%;
						}
						.submit-button {
              background-color:#9CBBE9;			
						}
						.go-back-button {
							border: 2px solid #000;
							background-color:#fff;			
						}
						`;
			shadow.appendChild(style);
			shadow.appendChild(button);
		}
	}
	customElements.define('custom-button', ButtonComponent);
}
