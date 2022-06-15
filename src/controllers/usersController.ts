import { findUsers, findUser } from "../models/usersModel";
import * as http from "http";
import { User } from "../data/database";

export async function getUsers (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
        const users = await findUsers();
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

export async function getUser (req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {
        const user = await findUser(id);

        if (!user) {
            res.writeHead(404, { "Content-type": "application/json" });
            res.end(JSON.stringify({ message: 'User not found'}));
        } else {
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(user));
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function createUser (req: http.IncomingMessage, res: http.ServerResponse): Promise<User> {
    try {
        const user = {
            username: "test",
            age: 2,
            hobbies: [],
        }
        const newUser = await create(user);
        res.writeHead(201, { 'Content-type': 'application/json'});
        return res.end(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}