module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: { type: DataTypes.STRING, allowNull: false },
      pwd: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Games, {
      onDelete: 'cascade',
    });
  };

  return Users;
};
