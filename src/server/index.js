const Koa = require('koa');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const socketIO = require('socket.io');

const app = new Koa();

let root = '../../build';
app.use(koaStatic(root));

app.use(koaLogger());

const server = app.listen(3000);


let io = socketIO(server);

io.on('connection', (data) => {
	debugger;
});