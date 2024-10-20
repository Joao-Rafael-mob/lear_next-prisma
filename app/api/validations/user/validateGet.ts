import { fieldValueString } from "../global/fieldValue";

interface ValidationErrors {
    email?: string;
}

export function validateGet(email: string): ValidationErrors{
    const errors: Record<string, string> = {};

    fieldValueString(email, 'email', errors)

    return errors;
}