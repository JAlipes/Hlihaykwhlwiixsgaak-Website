import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserSchema';

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthController{
    static async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});

            if(!user){
                return res.status(401).json({message : 'Invalid Credentials'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({message: 'Invalid Credentials'});
            }

            const token = jwt.sign({username : user.name}, JWT_SECRET, {expiresIn: '1h'});

            return res.status(200).json({token})
        }catch(e){
            return res.status(500).json({message: 'login failed', error: e})
        }
    }
}