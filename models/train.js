const Sequelize = require('sequelize');
const sequelize = require('../database');

const Train = sequelize.define('train', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stations: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bookedSeats: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    departureTime: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Train;
