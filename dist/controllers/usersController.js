"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUsers = void 0;
const usersModel_1 = require("../models/usersModel");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, usersModel_1.findUsers)();
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(users));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, usersModel_1.findUser)(id);
            if (!user) {
                res.writeHead(404, { "Content-type": "application/json" });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
            else {
                res.writeHead(200, { "Content-type": "application/json" });
                res.end(JSON.stringify(user));
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                const { username, age, hobbies } = JSON.parse(body);
                const user = {
                    username,
                    age,
                    hobbies,
                };
                const newUser = yield (0, usersModel_1.create)(user);
                res.writeHead(201, { 'Content-type': 'application/json' });
                return res.end(JSON.stringify(newUser));
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=usersController.js.map