import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserSchema";

import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

console.log(process.env.CLIENT_NAME)
const JWT_SECRET = GetEnvVarOrFail('JWT_SECRET') as string;

export async function Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            console.log(`User doesn't exist`)
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Incorrect password`)
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        console.log(`signing token ${process.env.JWT_SECRET}`)
        const token = jwt.sign(
            { name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log(`Success`);

        return res.status(200).json({ token });
    } catch (e) {
        console.log('Login Failed');
        return res.status(500).json({ message: "Login failed", error: e });
    }
}
