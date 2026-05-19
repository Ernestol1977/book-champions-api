import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { validateRegisterUser } from "../helpers/validations.js";

export const registerUser = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (result.error) return res.status(400).send({ message: result.message });
    
    const { userName, email, password } = req.body;

    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (user) return res.status(400).send({ message: "Usuario existente" });

    // Hash the password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name: userName,
        email,
        password: hashedPassword,
    });

    res.json(newUser.id);
};
