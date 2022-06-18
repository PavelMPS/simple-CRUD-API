import * as http from "http";

import {
  findUsers,
  findUser,
  create,
  update,
  remove,
} from "../models/usersModel";
import { getPostDate, uuidValidateV4 } from "../utils";
import { User, UserBody } from "../types";



export async function getUsers(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  try {
    const users: User[] = await findUsers();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Error on server side" }));
    console.error(error);
  }
}

export async function getUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> {
  if (uuidValidateV4(id)) {
    try {
      const user: User | undefined = await findUser(id);
      if (!user) {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      } else {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(user));
      }
    } catch (error) {
      res.writeHead(500, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Error on server side" }));
      console.error(error);
    }
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User Id is not valid" }));
  }
}

export async function createUser(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<http.ServerResponse | undefined> {
  try {
    const body: string = await getPostDate(req);
    const { username, age, hobbies } = JSON.parse(body);
    if (username && age && hobbies) {
      const user: UserBody = {
        username,
        age,
        hobbies,
      };
  
      const newUser: User = await create(user);
  
      res.writeHead(201, { "Content-type": "application/json" });
      return res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid request body" }));
    }
    
  } catch (error) {
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Error on server side" }));
    console.error(error);
  }
}

export async function updateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<http.ServerResponse | undefined> {
  try {
    const user: User | undefined = await findUser(id);

    if (!user) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      const body: string = await getPostDate(req);
      const { username, age, hobbies }: UserBody = JSON.parse(body);

      const userData: UserBody = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatingUser: User = await update(id, userData);

      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(updatingUser));
    }
  } catch (error) {
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Error on server side" }));
    console.error(error);
  }
}

export async function deleteUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> {
  if (uuidValidateV4(id)) {
    try {
      const user: User | undefined = await findUser(id);

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
      res.writeHead(500, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Error on server side" }));
      console.error(error);
    }
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User Id is not valid" }));
  }
}
