
const jwt = require("jsonwebtoken");
const db = require("../models/index");

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      video: req.body.video
    };
  
    Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ups! ocurrio un error al crear el tutorial."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
      .then(data => {
        const payload = {
          check:  true
        };
        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: 1440
         });
        res.send({
          data, 
          token
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ups! ocurrio un error buscando el tutorial."
        });
      });
  };


  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Ups! no pudimos encontrar el tutorial con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ups! no pudimos encontrar el tutorial con id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            success: true,
            message: "El tutorial se creo correctamente!"
          });
        } else {
          res.send({
            success: false,
            message: `Ups! no pudimos modificar el tutorial con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ups! no pudimos modificar el tutorial con id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            success: true,
            message: "El tutorial se elimino correctamente!"
          });
        } else {
          res.send({
            success: false,
            message: `Ups! no pudimos elimiar el tutorial con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ups! no pudimos elimiar el tutorial con id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutoriales se eliminaron correctamente!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ups! ocurrio un error al eliminar los tutoriales."
        });
      });
  };
