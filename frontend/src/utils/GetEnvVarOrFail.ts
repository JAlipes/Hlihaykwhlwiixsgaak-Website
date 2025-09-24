export const getEnvVar = (varName: string): string | undefined => {
    return (import.meta.env as Record<string, string>)[varName];
};

export const GetEnvVarOrFail = (varName: string): string => {
    const value = getEnvVar(varName);
    if (!value || value.trim().length < 1) {
        throw new Error(`Missing ${varName} env var. Make sure it is defined in your .env file`);
    }
    return value;
};
