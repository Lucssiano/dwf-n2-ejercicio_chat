class ButtonComponent extends HTMLElement {
		shadow: ShadowRoot;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: 'open' });
		}
		connectedCallback(){
			this.render();
		}
		render() {
			const button = document.createElement('button');
			button.innerHTML = `
					<custom-text variant="large">${this.textContent}</custom-text>
			`;

			const style = document.createElement('style');
			style.textContent = `
						* {
							box-sizing: border-box;
						}
						button {
							cursor: pointer;
							border: none;
							border-radius: 4px;
							padding: 15px 0;		
							text-align: center;		
							width: 100%;
							background-color:#9CBBE9;			
						}
						`;

			this.shadow.appendChild(style);
			this.shadow.appendChild(button);
		}
}
customElements.define('custom-button', ButtonComponent);
