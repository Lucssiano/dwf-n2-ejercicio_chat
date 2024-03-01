import { database as rtdb } from './rtdb';
const API_BASE_URL = 'http://localhost:3000';

export const state = {
	data: {
		name: '',
	},
	listeners: [],
	init() {},
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
