const express = require("express");
const Pacientes = require("../../../../dao/pacientes/pacientes.model");
const router = express.Router();

const PacienteModel = require("../../../../dao/pacientes/pacientes.model");
const pacienteModel = new PacienteModel();

router.get("/", (req, res) => {
  res.status(200).json({
    endpoint: "Pacientes",
    update: new Date(2022, 0, 29, 01, 26, 00),
  });
}); //get / close

router.get("/all", async (req, res) => {
  try {
    const rows = await pacienteModel.getAll();
    res.status(200).json({ status: "ok", pacientes: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
}); //end getall

router.get("/byid/:id", async (req, res) => {
  try {
    const { id } = req.params; //devuelve como texto el id
    const row = await pacienteModel.getById(parseInt(id));
    res.status(200).json({ status: "ok", paciente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
}); //end getById

router.get("/getagegender/:age/:gender", async (req, res) => {
  try {
    const { id } = req.params; //devuelve como texto el id
    const row = {}; //await pacienteModel.getById(parseInt(id));
    res.status(200).json({ status: "ok", paciente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
}); //end getagegenr   => para dos o mas parametros como edad y genero

router.post("/new", async (req, res) => {
  const { nombres, apellidos, identidad, email, telefono } = req.body;
  try {
    rslt = await pacienteModel.new(
      nombres,
      apellidos,
      identidad,
      telefono,
      email
    );
    res.status(200).json({
      status: "ok",
      result: rslt,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({
      status: "FAILED",
      result: {},
    });
  }
}); //POST/NEW  CLOSE

//router.put();
router.put("/update/:id", async (req, res) => {
  try {
    const { nombres, apellidos, identidad, email, telefono } = req.body;
    const { id } = req.params;
    const result = await pacienteModel.updateOne(
      id,
      nombres,
      apellidos,
      identidad,
      telefono,
      email
    );
    res.status(200).json({
      status: "ok",
      result,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "Faliled" });
  }
}); //end router.put/update

//router.delete();
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pacienteModel.deleteOne(id);
    res.status(200).json({
      status: "ok",
      result,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "Faliled" });
  }
}); //end router.put/delete

module.exports = router;
