// src/utils/seedUser.ts
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserSchema';

import { GetEnvVarOrFail } from './GetEnvVarOrFail'

export async function SeedUser() {
    try {
        const existing = await UserModel.findOne({ email: GetEnvVarOrFail('CLIENT_EMAIL') });
        if (existing) {
            console.log('Client user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(GetEnvVarOrFail('CLIENT_PASSWORD') as string, 10);

        await UserModel.create({
            name: GetEnvVarOrFail('CLIENT_NAME'),
            email: GetEnvVarOrFail('CLIENT_EMAIL'),
            password: hashedPassword,
        });

        console.log('Client user seeded');
    } catch (err) {
        console.error('Error seeding client user:', err);
        throw err;
    }
}
