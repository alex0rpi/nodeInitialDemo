module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      user: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false }, //pending, pending-started, completed
      startedIn: { type: DataTypes.STRING , allowNull: true },
      completedIn: { type: DataTypes.STRING , allowNull: true },
    },
    {
      timestamps: false,
    }
  );
  return Task;
};
