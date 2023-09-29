module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define("Produto", {
      nome: {
        type: Sequelize.STRING
      },
      unidade: {
        type: Sequelize.STRING
      },
      tipoProduto: {
        type: Sequelize.STRING
      },
      precoUnitario: {
        type: Sequelize.DOUBLE
      }
    },
    {
      freezeTableName: true,
      tableName: 'Produto'
    }
    );
  
    return Produto;
  };