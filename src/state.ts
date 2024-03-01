import { database as rtdb } from './rtdb';
import * as lodash from "lodash"
import { ref, onValue } from 'firebase/database';

const API_BASE_URL = 'http://localhost:3000';

export const state = {
	data: {
		name: '',
	},
	listeners: [],
	init() {
		const chatroomsRef = ref(rtdb, '/chatroom/messages');
        onValue(
			chatroomsRef,
			(snapshot) => {
				const data = snapshot.val();
				const dataArray = lodash.map(data);
				document.querySelector('.root').querySelector('chat-page').shadowRoot.querySelector('.chat-container').innerHTML = `
								${dataArray
									.map((el) => {
										return `<p>${el.from}: ${el.message}</p>`;
										/* Ver de hacer un <custom-text> */
									})
									.join('')}
							`;
			}, 
			(error) => {
				console.error('Error al escuchar cambios en la base de datos:', error);
			},
			{
				onlyOnce : true
			});
		  
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		/* Ver de guardarlo en localStorage */
		this.listeners.forEach((callback) => callback());
		console.log('nueva data', this.data);
	},
	setName(name: string) {
		const currentState = this.getState();
		currentState.name = name;
		this.setState(currentState);
	},
	pushMessage(message: string) {
		const currentState = this.getState();
		fetch(`${API_BASE_URL}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ from: currentState.name, message: message }),
		});
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
};
