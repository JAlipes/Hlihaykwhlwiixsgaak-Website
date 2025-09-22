import { config } from 'dotenv';

config(); // Automatic .env Load backend

export const getEnvVar = (varName: string): string | undefined => process.env[varName];

export const GetEnvVarOrFail = (varName: string): string => {
    const value = getEnvVar(varName);
    if (!value || value.trim().length < 1) {
        throw new Error(`Missing ${varName} env var`);
    }
    return value;
};