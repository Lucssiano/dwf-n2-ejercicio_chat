class FieldsetComponent extends HTMLElement {
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
        <label> <custom-text>${this.textContent || ''}</custom-text> <input type="text" class="fieldset-input"> </label>
    `;

		const style = document.createElement('style');
		style.textContent = `
    * {
      box-sizing: border-box;
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
customElements.define('custom-fieldset', FieldsetComponent);
