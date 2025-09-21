import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Imagen = sequelize.define('Imagen', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'URL del archivo de imagen',
    },
    descripcion: {
      type: DataTypes.STRING,
      comment: 'Descripción de la imagen',
    },
    // sequelize añadirá una columna 'actividadId' automáticamente
  });

  Imagen.associate = (models) => {
    Imagen.belongsToMany(models.Audio, { through: 'AudioImagen', foreignKey: 'imagenId', otherKey: 'audioId' });
  };

  export default Imagen;