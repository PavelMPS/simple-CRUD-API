import { v4 as uuidv4 } from "uuid";

import data from "../data/database.json";
import { writeDataToFile } from "../utils";
import { User, UserBody } from "../types";

export function findUsers(): Promise<User[]> {
  return new Promise((resolve, reject): void => {
    resolve(data as User[] | []);
  });
}

export function findUser(id: string): Promise<User | undefined> {
  return new Promise((resolve, reject): void => {
    const user: User | undefined = data.find((currentUser: User) => {
      return currentUser.id === id;
    });
      resolve(user);
  });
}

export function create(user: UserBody): Promise<User> {
  return new Promise((resolve, reject): void => {
    const newUser: User = { id: uuidv4(), ...user };
    (data as User[]).push(newUser);
    writeDataToFile("./src/data/database.json", data);
    resolve(newUser);
  });
}

export function update(id: string, user: UserBody): Promise<User> {
  return new Promise((resolve, reject): void => {
    const index: number = (data as User[]).findIndex((user): boolean => {
      return user.id === id;
    });
    (data as User[])[index] = { id, ...user };
    writeDataToFile("./src/data/database.json", data as User[] | []);
    resolve(data[index]);
  });
}

export function remove(id: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const newData: User[] | [] = (data as User[]).filter((user): boolean => {
      return user.id !== id;
    });
    writeDataToFile("./src/data/database.json", newData);
    resolve();
  });
}
