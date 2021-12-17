import { Users, Searches, Citations } from "./sync.js"

/*INIT SEQUELIZE */
async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!")
    }
    catch (err) {
        console.error(`Error connecting to the database using sequelize: ${err}`);
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: true, alter: true });
        console.log("Sync completed!")
    }
    catch (err) {
        console.error(`Error sync failed: ${err}`);
    }
}

async function executeInitialDatabasePopulation() {// aici
    try {
        await Users.create({
            Name: "Name from code",
            Email: "Email from code",
        });

        await Users.create({
            Name: "Name2 from code",
            Email: "Email2 from code",
        });

        await Searches.create({
            DOI: "Digital Object Identifier from code",
            UserId: 1, //aici treb sa fiu atent pt functia getuserswithsearches
        });

        await Citations.create({
            Title: "Title from code",
            Text: "Text from code",
        });
    }
    catch (err) {
        console.error(`Problem populating the database: ${err}`);
    }
}

async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await executeInitialDatabasePopulation();// si aici se populeaza
}
/*INIT SEQUELIZE */

async function getUsers() {
    try {
        return await Users.findAll();
    }
    catch (err) {
        console.log(err);
    }
};

async function createUser(user) {
    try {
        await Users.create({
            Name: user.Name,
            Email: user.Email,
        });
    }
    catch (err) {
        throw err;
    }
}

async function deleteUser(userId) {
    try {
        const record = await Users.findByPk(userId);
        if (record) await record.destroy();
    }
    catch (err) {
        throw err;
    }
}

async function updateUser(userId, user) {
    try {
        const record = await Users.findByPk(userId);
        if (record) {
            await record.update({
                Name: user.Name,
                Email: user.Email,
            });
        }
    }
    catch (err) {
        throw err;
    }
}

async function getUsersWithSearchesBy(searchId) {
    try {
        return await Users.findAll({
            include: [{
                model: Searches,
                where: { SearchId: searchId },
            },
            ],
        })
    }
    catch (err) {
        console.error(`Error while retrieving data : ${err}`);
    }
}



export const sequelizeOperationsApi = {
    init: sequelizeInit,
    getUsers: getUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUsersWithSearchesBy: getUsersWithSearchesBy,
};