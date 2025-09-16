import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserSchema";

import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

const JWT_SECRET = GetEnvVarOrFail('JWT_SECRET') as string;

export async function Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const authToken = jwt.sign(
            { name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log(`Auth Token: `, authToken);
        res.cookie("authToken", authToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax', //switch to strict later
            maxAge: 60 * 60 * 1000 //1hr expiration
        })

        return res.status(200).json({ message: 'Welcome'});
    } catch (e) {
        console.log('Login Failed');
        return res.status(500).json({ message: "Login failed", error: e });
    }
}
