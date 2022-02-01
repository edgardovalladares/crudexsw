const express = require("express");
const router = express.Router();

const ExpedienteModel = require("../../../../dao/expedientes/expedientes.model");
const expedienteModel = new ExpedienteModel();

router.get("/", (req, res) => {
  res.status(200).json({
    endpoint: "expedientes",
    update: new Date(2022, 0, 29, 01, 26, 00),
    author: "dannielmc_",
  });
}); //get / close

router.get("/all", async (req, res) => {
  try {
    const rows = await expedienteModel.getAll();
    res.status(200).json({ status: "ok", expediente: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
}); //end getall

router.get("/byid/:id", async (req, res) => {
  try {
    const { id } = req.params; //devuelve como texto el id
    const row = await expedienteModel.getById(parseInt(id));
    res.status(200).json({ status: "ok", expediente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "failed" });
  }
}); //end getById

router.post("/new", async (req, res) => {
  const {
    identidad,
    fecha,
    descripcion,
    observacion,
    registros,
    ultimaActualizacion,
  } = req.body;
  rslt = await expedienteModel.new(
    identidad,
    fecha,
    descripcion,
    observacion,
    registros,
    ultimaActualizacion
  );
  res.status(200).json({
    status: "ok",
    recieved: {
      identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion,
    },
  });
}); //POST/NEW  CLOSE

router.put("/update/:id", async (req, res) => {
  try {
    const {
      identidad,
      fecha,
      descripcion,
      registros,
      observacion ,
      ultimaActualizacion,
    } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateOne(
      id,
      fecha,
      identidad,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await expedienteModel.deleteOne(id);
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
