import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../../.env') }); // adjust to point to root

export const getEnvVar = (varName: string): string | undefined => process.env[varName];

export const GetEnvVarOrFail = (varName: string): string => {
    const value = getEnvVar(varName);
    if (!value || value.trim().length < 1) {
        throw new Error(`Missing ${varName} env var`);
    }
    return value;
};