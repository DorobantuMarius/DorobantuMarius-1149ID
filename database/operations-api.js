import mariadb from "mariadb";
import { databaseConfigProps } from "../config.js";

const instance = mariadb.createPool(databaseConfigProps);

async function connectToDatabase() {
    try {
        const connection = await instance.getConnection();
        return connection;
    }
    catch (err) {
        throw err;
    }
}

async function getTestValue(dbConnection) {
    try {
        const [result] = await dbConnection.query("Select 1 as val");
        return result;
    }
    catch (err) {
        console.error(err);
    }
}

async function getUsers(dbConnection) {
    try {
        const users = await dbConnection.query("Select * from Users");
        return users;
    }
    catch (err) {
        console.error(err);
    }
}

async function getUser(dbConnection, userId) {
    try {
        const user = await dbConnection.query("Select * from Users WHERE UserId = ?", [userId]);
        return user;
    }
    catch (err) {
        console.error(err);
    }
}

async function deleteUser(dbConnection, userId) {
    try {
        await dbConnection.query("DELETE FROM Users WHERE UserId = ?", [userId]);
        return user;
    }
    catch (err) {
        console.error(err);
    }
}

async function createUser(dbConnection, user) {
    try {
        const { name, email } = user;
        await dbConnection.query("INSERT INTO Users (Name, Email) VALUES (?, ?)", [name, email],
            function handleError(err) {
                throw err;
            })
    }
    catch (err) {
        throw err;
    }
}

export const databaseOperationsApi = {
    connect: connectToDatabase,
    getTestValue: getTestValue,
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    createUser: createUser,
};