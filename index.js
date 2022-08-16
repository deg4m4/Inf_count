import express from 'express'
const app = express()
import {createServer} from 'http'
const server = createServer(app)
import { Server } from 'socket.io';
const io = new Server(server);

let c = 1000
const minE = 30
const maxE = 35
const perMS = 2000

const setIn = () => {
	setTimeout(() => {
		c += Math.floor(Math.random() * (maxE - minE + 1) + minE)
		// console.log(c)		
		setIn()
	}, perMS)
}

app.get('/', (_req, res) => {
	res.sendFile('/home/parthka/Projects/countd/index.html')
});

io.on('connection', (socket) => {
	setInterval(() => {
		socket.emit('chat message', c)
	}, perMS)
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

setIn()

