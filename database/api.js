
import { router } from "../server-init.js";
import { databaseOperationsApi } from "./operations-api.js";

let connection;

if (!connection)
    databaseOperationsApi.connect().then((con) => {
        connection = con;
        console.log("Successfully connected to the database");
    })
        .catch((err) => console.error(err));

/* ROUTES */

router.route("/check-status").get(function sendStatusResponse(_, response) {
    response.status(200).json(`All good! System time : ${new Date()}`);
});

router.route("/get-test-value").get(async function getTestValue(_, response) {
    const value = await databaseOperationsApi.getTestValue(connection);
    response.status(200).json(value);
});

router.route("/users").get(async function getUsers(_, response) {
    const users = await databaseOperationsApi.getUsers(connection);
    response.status(200).json(users);
});

router.route("/users/:userId").get(async function getUserById(request, response) {
    const userId = +request.params.userId;
    const user = await databaseOperationsApi.getUser(connection, userId);
    response.status(200).json(user);
});

router.route("/users/:userId").delete(async function deleteUser(request, response) {
    const userId = +request.params.userId;
    await databaseOperationsApi.deleteUser(connection, userId);
    response.status(200).json("Success!");
});

router.route("/users").post(async function createUser({ body: user }, response) {
    try {
        await databaseOperationsApi.createUser(connection, user);
        response.status(200).json("Success!");
    }
    catch (err) {
        console.error(err);
        response.status(500).json("Internal server error!");
    }
})

/* ROUTES */
