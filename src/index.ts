import * as http from "http";
import "dotenv/config";

import { notFound } from "./controllers/notFoundController";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/usersController";
import { getId } from "./utils";

const PORT: number | string = process.env.PORT || 4000;

const myServer: http.Server = http.createServer((req, res): void => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url!.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id: string = getId(req);
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url!.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT") {
    const id: string = getId(req);
    updateUser(req, res, id);
  } else if (
    req.url!.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE"
  ) {
    const id: string = getId(req);
    deleteUser(req, res, id);
  } else {
    notFound(req, res);
  }
});

myServer.listen(PORT, (): void => {
  process.stdout.write(`Server is running on port: ${PORT}`);
});
