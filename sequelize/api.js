import "./sync.js";
import { router } from "../server-init.js";
import { sequelizeOperationsApi } from "./operations-api.js";


/* ROUTES */

router.route("/sequelize/users").get(async function getSequelizeUsers(_, response) {
    const result = await sequelizeOperationsApi.getUsers();
    response.status(200).json(result);
})

router.route("/sequelize/users").post(async function createUser({ body }, response) {
    try {
        await sequelizeOperationsApi.createUser(body);
        response.status(200).json("Succes!");
    }
    catch (err) {
        console.error(`Error while calling API: ${err}`);
    }
});

router.route("/sequelize/users/:userId").delete(async function deleteUser({ params: { userId } },
    response) {
    try {
        await sequelizeOperationsApi.deleteUser(+userId);
        response.status(200).json("Succes!");
    }
    catch (err) {
        console.error(`Error while calling API: ${err}`);
    }
});

router.route("/sequelize/users/:userId").put(async function updateUser({ params: { userId }, body },
    response) {
    try {
        await sequelizeOperationsApi.updateUser(+userId, body);
        response.status(200).json("Succes!");
    }
    catch (err) {
        console.error(`Error while calling API: ${err}`);
    }
});

router.route("/sequelize/usersWithSearches/:searchId").get(async function getUsersWithSearchId(
    { params: { searchId } }, response) {
    const result = await sequelizeOperationsApi.getUsersWithSearchesBy(+searchId);
    response.status(200).json(result);
});

/* ROUTES */
