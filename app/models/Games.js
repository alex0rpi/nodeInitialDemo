module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    'Games',
    {
      dice1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dice2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wins: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Games;
};
