"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findUser = exports.findUsers = void 0;
const database_json_1 = __importDefault(require("../data/database.json"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
function findUsers() {
    return new Promise((resolve, reject) => {
        resolve(database_json_1.default);
    });
}
exports.findUsers = findUsers;
function findUser(id) {
    return new Promise((resolve, reject) => {
        const user = database_json_1.default.find((currentUser) => {
            return currentUser.id === id;
        });
        resolve(user);
    });
}
exports.findUser = findUser;
function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        database_json_1.default.push(newUser);
        (0, utils_1.writeDataToFile)('./src/data/database.json', database_json_1.default);
        resolve(newUser);
    });
}
exports.create = create;
//# sourceMappingURL=usersModel.js.map