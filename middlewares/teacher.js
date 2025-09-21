import Actividad from "../models/Actividad.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const GetInfo = async (req, res) => {
  try {
    const { email,password } = req.body;
    if (email && password) {
      const usuario = await Admin.findOne({ where: { email:email?.toLowerCase(),password } });

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