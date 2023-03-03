module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'ANÒNIM',
      },
    },
    {
      timestamps: false,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Partides, {
      onDelete: 'cascade',
    });
  };

  return Users;
};
