const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'message-services.db',
});

const Message = sequelize.define('Message', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  }
});

module.exports = Message;