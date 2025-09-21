import { DataTypes } from "sequelize";
import sequelize from "../database.js";

 const Actividad = sequelize.define('Actividad', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Título o nombre de la actividad',
    },
    descripcion: {
      type: DataTypes.TEXT,
      comment: 'Descripción detallada de la actividad',
    },
    tipoActividad: {
      type: DataTypes.ENUM('Fonética', 'PalabrasComunes', 'Cuento', 'ComprensiónLectora'),
      allowNull: false,
      comment: 'Tipo de actividad para clasificarla (ej. Fonética, PalabrasComunes)',
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Nivel de dificultad (ej. 1, 2, 3)',
    },
    puntosRecompensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Puntos que el niño gana al completar la actividad',
    },
    audioUrl: {
      type: DataTypes.STRING,
      comment: 'URL del archivo de audio principal de la actividad (ej. para la narración)',
    },
    contenidoTexto: {
      type: DataTypes.TEXT,
      comment: 'Texto principal de la actividad (ej. el cuento o las frases a leer)',
    },
    imagenUrl: {
      type: DataTypes.STRING,
      comment: 'URL de una imagen asociada a la actividad',
    },
  }, {
    // Opciones adicionales del modelo
    timestamps: true,
    // Puedes agregar más opciones como `tableName` si lo necesitas
  });

export default Actividad;
