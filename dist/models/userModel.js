"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.database = void 0;
const database = [
    {
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
        role: "user"
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "johnny123@gmail.com",
        password: "johnny123!",
        role: "user"
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "jonathan123@gmail.com",
        password: "jonathan123!",
        role: "user"
    },
    {
        id: 4,
        name: "Jess Stephenson",
        email: "jessstephenson@gmail.com",
        password: "jessstephenson",
        role: "admin"
    }
];
exports.database = database;
const userModel = {
    findOne: (email) => {
        try {
            const user = database.find((user) => user.email === email);
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            console.log(`userModel can't find user: `, error);
        }
    },
    findById: (id) => {
        try {
            const user = database.find((user) => user.id === id);
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            console.log(error);
            //  throw error         
        }
    },
};
exports.userModel = userModel;
