import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsApi } from "./operations-api.js";

const sequelizeConnection = new Sequelize(
    "manager",
    "root",
    "",
    sequelizeConfigProps
);

/*ENTITIES */
export const Users = sequelizeConnection.define("Users", {
    UserId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Email: {
        type: Sequelize.STRING,
    }
});


export const Searches = sequelizeConnection.define("Searches", {
    SearchId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    DOI: {
        type: Sequelize.STRING,
    },
});

export const Citations = sequelizeConnection.define("Citations", {
    CitationId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Title: {
        type: Sequelize.STRING,
    },
    Text: {
        type: Sequelize.STRING,
    }
});

Users.hasMany(Searches, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
    foreignKeyConstraint: true,
});

Searches.hasMany(Citations, {
    foreignKey: "SearchId",
    onDelete: "CASCADE",
    foreignKeyConstraint: true,
});

/*ENTITIES */

sequelizeOperationsApi.init(sequelizeConnection);

export { sequelizeConnection };
