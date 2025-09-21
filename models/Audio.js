import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Imagen from "./Imagen.js";

const Audio = sequelize.define('Audio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'URL del archivo de audio',
    },
    descripcion: {
      type: DataTypes.STRING,
      comment: 'Descripción del audio (ej. Sonido de la letra A)',
    },
    // sequelize añadirá una columna 'actividadId' automáticamente
  });

  Audio.belongsToMany(Imagen, { through: 'AudioImagen', foreignKey: 'audioId', otherKey: 'imagenId' });

  export default Audio;