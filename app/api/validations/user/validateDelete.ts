
import { fieldValueString } from "../global/fieldValue";

interface ValidationErrors {
    email?: string;
}

export function validateDelete(email: string): ValidationErrors{
    const errors: Record<string, string> = {};

    fieldValueString(email, 'email', errors)

    return errors;
}