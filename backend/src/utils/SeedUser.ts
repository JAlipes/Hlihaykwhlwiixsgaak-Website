// src/utils/seedUser.ts
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserSchema';

export async function seedUser() {
    try {
        const existing = await UserModel.findOne({ email: process.env.CLIENT_EMAIL });
        if (existing) {
            console.log('Client user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.CLIENT_PASSWORD as string, 10);

        await UserModel.create({
            name: process.env.CLIENT_NAME,
            email: process.env.CLIENT_EMAIL,
            password: hashedPassword,
        });

        console.log('Client user seeded');
    } catch (err) {
        console.error('Error seeding client user:', err);
        throw err;
    }
}
