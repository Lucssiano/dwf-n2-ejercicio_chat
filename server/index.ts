import express from 'express';
import { realTimeDB, firestoreDB } from './db';
import { json } from 'body-parser';
import cors from 'cors';
// import { v4 as uuidv4 } from 'uuid';

const port = 3000;

const app = express();
app.use(json());
app.use(cors());

// const chatroomsCollection = firestoreDB.collection('chatrooms');

app.post('/messages', (req, res) => {
	const chatRoomRef = realTimeDB.ref('/chatroom/messages');
	console.log(req.body);
	chatRoomRef.push(req.body, () => {
		res.json({ status: 'ok' });
	});
});

app.listen(port);
