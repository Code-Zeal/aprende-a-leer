import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const Login = async (req, res) => {
  try {
    console.log(req.body);

    const { password, email, yearAndSection } = req.body;
    if ( password && email) {
      let usuario = await User.findOne({ where: { email:email?.toLowerCase() } });

      if (!usuario) {
        // Si el usuario no existe, lo creamos
        // usuario = await User.create({
        //   name,
        //   email:email?.toLowerCase(),
        //   yearAndSection,
        //   classrooms: [],
        // });
        throw new Error("Usuario no existe");
      }
      if(usuario.password !== password){
        throw new Error("Contraseña incorrecta");
      }

      return res.status(200).json(usuario.dataValues);
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const Register = async (req, res) => {
  try {
    console.log(req.body);

    const { password, email, age, name } = req.body;
    if ( password && email) {
      let usuario = await User.findOne({ where: { email:email?.toLowerCase() } });

      if (!usuario) {
        // Si el usuario no existe, lo creamos
         usuario = await User.create({
           name,
           email: email?.toLowerCase(),
           age,
           password,
         });

         return res.status(200).json(usuario.dataValues);
      }else{
        
        throw new Error("Usuario ya existe");
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

export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      let usuario = await Admin.findOne({ where: { email:email?.toLowerCase(),password } });
      if(usuario){

        return res.status(200).json(usuario.dataValues);
      }else{
        return res
        .status(404)
        .send("Usuario no encontrado");
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
