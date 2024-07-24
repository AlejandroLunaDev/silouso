import { userModel } from "../dao/models/userModel.js";

class UserController {

    getAllUsers = async (req, res) => {
        try {
            let users = await userModel.find();
            res.send({resulut:"sucess",payload:users});
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    }
}

export default UserController