import data from '../data/database.json';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from "../utils";
import { User, User2 } from '../types';

export function findUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

export function findUser(id: string): Promise<User> {
    return new Promise ((resolve, reject) => {
        const user: User | undefined = data.find((currentUser: User) => {
           return currentUser.id === id;
        });
        if (user) {
            resolve(user);
        }     
    });
}

export function create(user: User2): Promise<User> {
    return new Promise ((resolve, reject) => {
        const newUser: User = { id: uuidv4(), ...user };
        data.push(newUser);
        writeDataToFile('./src/data/database.json', data);
        resolve(newUser);
    });
}

export function update(id: string, user: User2): Promise<User> {
    return new Promise ((resolve, reject) => {
        const index = data.findIndex((user) => {
            return user.id === id;
        })
        data[index] = { id, ...user }
        writeDataToFile('./src/data/database.json', data);
        resolve(data[index]);
    });
}

export function remove(id: string): Promise<void> {
    return new Promise ((resolve, reject) => {
        const newData = data.filter((user) => {
            return user.id !== id;
        })
        writeDataToFile('./src/data/database.json', newData);
        resolve();
    });
}
