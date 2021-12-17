export var databaseConfigProps = {
    port: 3306,
    host: "Localhost",
    user: "root",
    password: "",
    database: "manager",

};

export const sequelizeConfigProps = {
    host: "Localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            trustedConnection: true,
        },
    },
};