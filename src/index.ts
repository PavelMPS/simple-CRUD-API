import * as http from "http";
import { notFound } from "./controllers/notFoundController";
import { getUsers, getUser, createUser } from "./controllers/usersController";

console.log("Application started");
const PORT: number | string = process.env.PORT || 4000;
const myServer: http.Server = http.createServer((req, res) => {
    if (req.url === "/api/users" && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    } else {
        notFound(req, res);
    }
});

myServer.listen(PORT, (): void => {
  process.stdout.write(`Server is running on port: ${PORT}`);
});
