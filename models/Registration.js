'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      // No associations for now
    }
  }
  Registration.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      ageGroup: DataTypes.STRING,
      courseName: DataTypes.STRING,
      paymentScreenshot: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Registration',
    }
  );
  return Registration;
};
