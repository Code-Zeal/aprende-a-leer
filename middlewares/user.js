import { Op } from "sequelize";
import sequelize from "../database.js";
import User from "../models/User.js";


export const GetInfo = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const usuario = await User.findOne({ where: { email:email?.toLowerCase() } });

      if (usuario) {
        return res.status(200).json(usuario.dataValues);
      } else {
        throw new Error("Usuario no encontrado");
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
