import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Import Utils
import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

const JWT_SECRET = GetEnvVarOrFail('JWT_SECRET') as string;

export function Authenticate(req: Request, res: Response, next: NextFunction) {
    // Make sure cookie-parser middleware is used before this
    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; // Attach decoded token data to req
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
