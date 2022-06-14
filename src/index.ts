import * as http from 'http';

console.log('Application started');

const myServer = http.createServer();
const port: number = 8000;
myServer.listen(port, () => {
    console.log(`Server is started on ${port} port!`);
});
