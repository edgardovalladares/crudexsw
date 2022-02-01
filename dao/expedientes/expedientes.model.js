const getDb = require("../db");
let db = null;
class Expedientes {
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        if (process.env.MIGRATE === "true") {
          const createStatement =
            "CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registros TEXT,ultimaActualizacion TEXT);";
          db.run(createStatement);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  new(
    identidad,
    fecha,
    descripcion,
    observacion,
    registros,
    ultimaActualizacion
  ) {
    return new Promise((accept, reject) => {
      db.run(
        "INSERT INTO expedientes (identidad,fecha,descripcion,observacion,registros,ultimaActualizacion) VALUES (?, ?, ?, ?,?,?);",
        [
          identidad,
          fecha,
          descripcion,
          observacion,
          registros,
          ultimaActualizacion,
        ],
        (err, rslt) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });
  } // end new

  getAll() {
    return new Promise((accept, reject) => {
      db.all("SELECT * from expedientes;", (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } // end if (err)
        accept(rows);
      }); //end return
    });
  } //end getAll

  getById(id) {
    return new Promise((accept, reject) => {
      db.all("SELECT * from expedientes WHERE id=?;", [id], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } // end if (err)
        accept(row);
      }); //end return
    });
  } //end getById

  updateOne(
    id,
    identidad,
    fecha,
    descripcion,
    observacion,
    registros,
    ultimaActualizacion
  ) {
    return new Promise((accept, reject) => {
      const sqliteUpdate =
        "UPDATE expedientes set identidad= ?, fecha = ?, descripcion = ?, observacion = ?, registros = ?,ultimaActualizacion =? where id =?";
      db.run(
        sqliteUpdate,
        [
          fecha,
          identidad,
          descripcion,
          observacion,
          registros,
          ultimaActualizacion,
          id,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            accept(this);
          }
        }
      );
    }); //end Promise
  } //end update

  deleteOne(id) {
    return new Promise((accept, reject) => {
      const sqlDelete = "DELETE FROM expedientes where  id =?";
      db.run(sqlDelete, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          accept(this);
        }
      });
    }); //end Promise
  } //end DELETE
} //end class expedientes

module.exports = Expedientes;
