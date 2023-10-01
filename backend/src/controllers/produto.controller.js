const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validar requisição
    console.log(req.body);
    if (!req.body.nome) {
      res.status(400).send({
        message: "Conteúdo não pode ser vazio!"
      });
      return;
    }
  
    //criar objeto
    const produto = {
      nome: req.body.nome,
      unidade: req.body.unidade,
      tipoProduto: req.body.tipoProduto,
      precoUnitario: req.body.precoUnitario
    };
      
    Produto.create(produto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erros ocorreram ao criar um produto."
        });
      });
};


exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;
  
    Produto.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erros ocorreram ao recuperar um produto."
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar produto com id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Produto.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Produto atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Não foi possível atualizar produto com id=${id}. Talvez o produto não tenha sido encontrado ou req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar produto com id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Produto.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Produto deletado com sucesso!"
          });
        } else {
          res.send({
            message: `Não foi possível deletar produto com id=${id}. Talvez o produto não tenha sido encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Não foi possível deletar produto com id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Produto.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Produtos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erros ocorreram ao deletar todos produtos."
        });
    });
};

exports.findAllPrecoUnitarioValido = (req, res) => {
    Produto.findAll({ where: { precoUnitario : ">0"  } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erros ocorreram ao recuperar produtos."
        });
      });
  };