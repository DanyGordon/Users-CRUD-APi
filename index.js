const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

http.createServer(app).listen(port, host, () => {
    console.log(`Server has started on http://${host}:${port}`);
})