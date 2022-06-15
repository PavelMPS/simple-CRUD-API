export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export const data: User[] | [] = [
  {
    id: "1",
    username: "Pavel",
    age: 35,
    hobbies: ["bicycle", "aquarium", "ping-pong", "swimming"],
  },
  {
    id: "2",
    username: "Nastya",
    age: 30,
    hobbies: ["Deutsch", "bubbles-game"],
  },
  {
    id: "3",
    username: "Bonya",
    age: 2,
    hobbies: [],
  },
];
