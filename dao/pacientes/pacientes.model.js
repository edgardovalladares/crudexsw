const getDb = require("../db");
let db = null;
class Pacientes {
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        if (process.env.MIGRATE === "true") {
          const createStatement =
            "CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);";
          db.run(createStatement);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  new(nombres, apellidos, identidad, telefono, correo) {
    return new Promise((accept, reject) => {
      db.run(
        "INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);",
        [identidad, nombres, apellidos, correo, telefono],
        (err, rslt) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });
  } //end new

  getAll() {
    return new Promise((accept, reject) => {
      db.all("SELECT * from pacientes;", (err, rows) => {
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
      db.all("SELECT * from pacientes WHERE id=?;", [id], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } // end if (err)
        accept(row);
      }); //end return
    });
  } //end getById

  updateOne(id, nombres, apellidos, identidad, telefono, correo) {
    return new Promise((accept, reject) => {
      const sqliteUpdate =
        "UPDATE pacientes set nombre = ?, apellidos = ?, telefono = ?, identidad = ?, email = ? where id =?";
      db.run(
        sqliteUpdate,
        [nombres, apellidos, identidad, telefono, correo, id],
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
      const sqlDelete = "DELETE FROM pacientes where  id =?";
      db.run(sqlDelete, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          accept(this);
        }
      });
    }); //end Promise
  } //end DELETE
} //end class pacientes

module.exports = Pacientes;
