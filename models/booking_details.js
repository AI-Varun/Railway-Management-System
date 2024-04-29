const Sequelize = require('sequelize');
const sequelize = require('../database');
const Train = require('./train');

const Booking = sequelize.define('booking', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    trainId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});


Booking.belongsTo(Train, { foreignKey: 'trainId' });

module.exports = Booking;
