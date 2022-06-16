import {
  findUsers,
  findUser,
  create,
  update,
  remove,
} from "../models/usersModel";
import * as http from "http";
import { getPostDate } from "../utils";
import { User, User2 } from "../types";

export async function getUsers(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  try {
    const users = await findUsers();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> {
  try {
    const user = await findUser(id);

    if (!user) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  try {
    const body: string = await getPostDate(req);
    const { username, age, hobbies } = JSON.parse(body);

    const user: User2 = {
      username,
      age,
      hobbies,
    };

    const newUser = await create(user);

    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) {
  try {
    const user: User = await findUser(id);

    if (!user) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      const body: string = await getPostDate(req);
      const { username, age, hobbies } = JSON.parse(body);

      const userData: User2 = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatingUser = await update(id, userData);
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(updatingUser));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> {
  try {
    const user = await findUser(id);

    if (!user) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      await remove(id);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ message: `User ${user.username} was removed!` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
