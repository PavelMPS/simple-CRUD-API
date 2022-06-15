import { data } from "../data/database";

export function findUsers() {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

export function findUser(id: string) {
    return new Promise ((resolve, reject) => {
        const user = data.find(currentUser => {
           return currentUser.id === id;
        });
        resolve(user);
    });
}
